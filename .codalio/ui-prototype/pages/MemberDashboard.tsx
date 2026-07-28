import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

import { CalendarDays, Ticket } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function MemberDashboard() {
    const { gym_slug: gymSlug = "apex-fitness" } = useParams();
    const [bookings, setBookings] = useState([{ id: "1", name: "Strength Circuit", time: "Monday, 6:00 PM" }, { id: "2", name: "Power Yoga", time: "Tuesday, 7:00 AM" }]);
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full flex-col gap-8 min-w-0">
          <section><p className="text-sm font-semibold uppercase tracking-wider text-primary">Member dashboard</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Good morning, Alex</h1><div className="mt-5 flex flex-wrap gap-3"><Button asChild><Link to={`/tenant/${gymSlug}/classes`}><CalendarDays className="mr-2 size-4" />Browse classes</Link></Button><Button asChild variant="outline"><Link to={`/tenant/${gymSlug}/bookings`}><Ticket className="mr-2 size-4" />My bookings</Link></Button></div></section>
  <section><h2 className="mb-5 text-2xl font-bold text-foreground">Upcoming bookings</h2><div className="grid gap-4 md:grid-cols-2">{bookings.length ? bookings.map((booking) => <Card key={booking.id}><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold">{booking.name}</h3><p className="mt-1 text-sm text-muted-foreground">{booking.time} · Studio A</p></div><Badge>Booked</Badge></div><Button onClick={() => setBookings(bookings.filter((item) => item.id !== booking.id))} className="mt-5" variant="outline" size="sm">Cancel booking</Button></CardContent></Card>) : <Card className="md:col-span-2"><CardContent className="p-8 text-center"><CalendarDays className="mx-auto size-8 text-muted-foreground" /><h3 className="mt-3 font-semibold">No upcoming bookings</h3><p className="mt-1 text-sm text-muted-foreground">Find a class that fits your schedule.</p><Button asChild className="mt-4"><Link to={`/tenant/${gymSlug}/classes`}>Browse classes</Link></Button></CardContent></Card>}<Card className="md:col-span-2"><CardHeader><CardTitle>Gym announcements</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">New recovery sessions are now available every Friday at 5 PM.</p></CardContent></Card></div></section>
      </div>
    </div>
  );
}