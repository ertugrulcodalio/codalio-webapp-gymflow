import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { useUser, useModelIndex, useModelUpdate } from "@rhino-project/core/hooks";

export default function MyBookings() {
  const [tab, setTab] = useState("upcoming");
  const { gym_slug: gymSlug = "apex-fitness" } = useParams();
  const user = useUser();

  // Fetch bookings and classes
  const { resources: bookingsData, isPending, refetch } = useModelIndex("booking", {
    filter: { user_id: user?.id }
  });
  const bookings = bookingsData?.results ?? [];

  const { resources: classesData } = useModelIndex("gym_class");
  const classes = classesData?.results ?? [];

  // Mutation to cancel booking
  const { mutateAsync: updateBooking } = useModelUpdate("booking", {
    onSuccess: () => {
      refetch();
    }
  });

  const handleCancel = async (bookingId: number) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await updateBooking({
          id: bookingId,
          status: "cancelled"
        });
      } catch (err: any) {
        alert(err?.response?.data?.errors?.[0] || err?.message || "Failed to cancel booking.");
      }
    }
  };

  const filteredBookings = bookings.filter((booking: any) => {
    if (tab === "upcoming") {
      return booking.status === "confirmed";
    } else {
      return booking.status === "cancelled" || booking.attendance_status === "attended" || booking.attendance_status === "no_show";
    }
  });

  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full flex-col gap-6 min-w-0">
        <section>
          <h1 className="mb-5 text-3xl font-bold tracking-tight">My bookings</h1>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
          </Tabs>
        </section>

        <section className="space-y-3">
          {isPending ? (
            <div className="text-center py-8 text-muted-foreground">Loading bookings...</div>
          ) : filteredBookings.length ? (
            filteredBookings.map((booking: any) => {
              const gymClass = classes.find((c: any) => c.id === booking.gym_class_id);
              return (
                <Card key={booking.id}>
                  <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold">{gymClass ? gymClass.name : "Unknown Class"}</h2>
                        {booking.status === "cancelled" && (
                          <Badge variant="destructive">Cancelled</Badge>
                        )}
                        {booking.attendance_status === "attended" && (
                          <Badge variant="success">Attended</Badge>
                        )}
                        {booking.attendance_status === "no_show" && (
                          <Badge variant="destructive">No Show</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {gymClass?.start_time ? new Date(gymClass.start_time).toLocaleString() : "-"}
                      </p>
                    </div>
                    {booking.status === "confirmed" && (
                      <Button variant="outline" onClick={() => handleCancel(booking.id)}>
                        Cancel booking
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="font-semibold">No bookings yet</h2>
                <Button asChild className="mt-4">
                  <Link to={`/tenant/${gymSlug}/classes`}>Browse classes</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}
