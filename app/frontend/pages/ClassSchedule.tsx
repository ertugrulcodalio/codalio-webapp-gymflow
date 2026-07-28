import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Clock, Users } from "lucide-react";
import { useUser, useModelIndex, useModelCreate, useBaseOwnerId } from "@rhino-project/core/hooks";

export default function ClassSchedule() {
  const { gym_slug: gymSlug = "apex-fitness" } = useParams();
  const user = useUser();
  const organizationId = useBaseOwnerId();
  const [search, setSearch] = useState("");
  const [day, setDay] = useState("all");

  // Fetch classes, trainers, and bookings
  const { resources: classesData, isPending: classesPending, refetch: refetchClasses } = useModelIndex("gym_class", {
    filter: { status: "scheduled" }
  });
  const classes = classesData?.results ?? [];

  const { resources: trainersData } = useModelIndex("trainer");
  const trainers = trainersData?.results ?? [];

  const { resources: bookingsData, refetch: refetchBookings } = useModelIndex("booking");
  const bookings = bookingsData?.results ?? [];

  // Mutation to book class
  const { mutateAsync: createBooking } = useModelCreate("booking", {
    onSuccess: () => {
      refetchBookings();
      refetchClasses();
    }
  });

  const handleBook = async (classId: number) => {
    try {
      await createBooking({
        user_id: user?.id,
        gym_class_id: classId,
        status: "confirmed",
        attendance_status: "pending",
        organization_id: organizationId
      });
      alert("Class booked successfully!");
    } catch (err: any) {
      alert(err?.response?.data?.errors?.[0] || err?.message || "Failed to book class.");
    }
  };

  const filteredClasses = classes.filter((gymClass: any) => {
    const matchesSearch = gymClass.name.toLowerCase().includes(search.toLowerCase());
    if (day === "all") return matchesSearch;
    
    // Simple day matching based on start_time
    const classDay = gymClass.start_time ? new Date(gymClass.start_time).toLocaleDateString('en-US', { weekday: 'long' }) : "";
    return matchesSearch && classDay.toLowerCase() === day.toLowerCase();
  });

  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full flex-col gap-6 min-w-0">
        <section>
          <h1 className="mb-5 text-3xl font-bold tracking-tight">Class schedule</h1>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search classes"
            />
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-[200px]"
            >
              <option value="all">Any day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
            <Button variant="outline" onClick={() => { setSearch(""); setDay("all"); }}>
              Reset filters
            </Button>
          </div>
        </section>

        <section aria-live="polite">
          {classesPending ? (
            <div className="text-center py-8 text-muted-foreground">Loading classes...</div>
          ) : filteredClasses.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-8 text-center">
              <p className="text-muted-foreground">No classes scheduled.</p>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-3">
              {filteredClasses.map((gymClass: any) => {
                const trainer = trainers.find((t: any) => t.id === gymClass.trainer_id);
                
                // Count active bookings for this class
                const activeBookings = bookings.filter((b: any) => b.gym_class_id === gymClass.id && b.status === "confirmed");
                const spotsLeft = Math.max(0, gymClass.capacity - activeBookings.length);
                
                // Check if current user already booked this class
                const isBooked = bookings.some((b: any) => b.gym_class_id === gymClass.id && b.user_id === user?.id && b.status === "confirmed");

                const classDate = gymClass.start_time ? new Date(gymClass.start_time) : null;
                const dayName = classDate ? classDate.toLocaleDateString('en-US', { weekday: 'long' }) : "";
                const timeStr = classDate ? classDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : "";

                return (
                  <Card key={gymClass.id}>
                    <CardContent className="p-5">
                      <div className="flex justify-between gap-3">
                        <h2 className="font-semibold">{gymClass.name}</h2>
                        <Badge variant={spotsLeft === 0 ? "destructive" : "secondary"}>
                          {spotsLeft === 0 ? "Full" : `${spotsLeft} spots`}
                        </Badge>
                      </div>
                      <p className="mt-3 flex gap-2 text-sm text-muted-foreground">
                        <Clock className="size-4" />
                        {dayName} · {timeStr}
                      </p>
                      <p className="mt-2 flex gap-2 text-sm text-muted-foreground">
                        <Users className="size-4" />
                        with {trainer ? trainer.name : "Unknown Trainer"}
                      </p>
                      <Button
                        className="mt-5 w-full"
                        disabled={spotsLeft === 0 || isBooked}
                        onClick={() => handleBook(gymClass.id)}
                      >
                        {isBooked ? "Booked" : spotsLeft === 0 ? "Class is full" : "Book class"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
