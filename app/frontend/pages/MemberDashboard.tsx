import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { CalendarDays, Ticket } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useUser, useModelIndex, useModelUpdate } from "@rhino-project/core/hooks";

export default function MemberDashboard() {
  const { gym_slug: gymSlug = "apex-fitness" } = useParams();
  const user = useUser();

  // Fetch bookings and classes
  const { resources: bookingsData, isPending, refetch } = useModelIndex("booking", {
    filter: { user_id: user?.id, status: "confirmed" }
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

  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full flex-col gap-8 min-w-0">
        <section>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Member dashboard</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Welcome, {user?.name || user?.email}</h1>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild>
              <Link to={`/tenant/${gymSlug}/classes`}>
                <CalendarDays className="mr-2 size-4" />Browse classes
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={`/tenant/${gymSlug}/bookings`}>
                <Ticket className="mr-2 size-4" />My bookings
              </Link>
            </Button>
          </div>
        </section>

        <section>
          <h2 className="mb-5 text-2xl font-bold text-foreground">Upcoming bookings</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {isPending ? (
              <div className="text-center py-8 text-muted-foreground md:col-span-2">Loading bookings...</div>
            ) : bookings.length ? (
              bookings.map((booking: any) => {
                const gymClass = classes.find((c: any) => c.id === booking.gym_class_id);
                return (
                  <Card key={booking.id}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold">{gymClass ? gymClass.name : "Unknown Class"}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {gymClass?.start_time ? new Date(gymClass.start_time).toLocaleString() : "-"}
                          </p>
                        </div>
                        <Badge>Booked</Badge>
                      </div>
                      <Button onClick={() => handleCancel(booking.id)} className="mt-5" variant="outline" size="sm">
                        Cancel booking
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card className="md:col-span-2">
                <CardContent className="p-8 text-center">
                  <CalendarDays className="mx-auto size-8 text-muted-foreground" />
                  <h3 className="mt-3 font-semibold">No upcoming bookings</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Find a class that fits your schedule.</p>
                  <Button asChild className="mt-4">
                    <Link to={`/tenant/${gymSlug}/classes`}>Browse classes</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Gym announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">New recovery sessions are now available every Friday at 5 PM.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
