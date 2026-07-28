import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function MyBookings() {
    const [tab, setTab] = useState("upcoming");
    const { gym_slug: gymSlug = "apex-fitness" } = useParams();
    const [bookings, setBookings] = useState([{ id: "1", name: "Strength Circuit", date: "Monday, 6:00 PM" }, { id: "2", name: "Power Yoga", date: "Tuesday, 7:00 AM" }]);
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full flex-col gap-6 min-w-0">
          <section><h1 className="mb-5 text-3xl font-bold tracking-tight">My bookings</h1><Tabs value={tab} onValueChange={setTab}><TabsList><TabsTrigger value="upcoming">Upcoming</TabsTrigger><TabsTrigger value="history">History</TabsTrigger></TabsList></Tabs></section>
  <section className="space-y-3">{bookings.length ? bookings.map((booking) => <Card key={booking.id}><CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold">{booking.name}</h2><p className="text-sm text-muted-foreground">{booking.date}</p></div><Button variant="outline" onClick={() => setBookings(bookings.filter((item) => item.id !== booking.id))}>Cancel booking</Button></CardContent></Card>) : <Card><CardContent className="p-8 text-center"><h2 className="font-semibold">No bookings yet</h2><Button asChild className="mt-4"><Link to={`/tenant/${gymSlug}/classes`}>Browse classes</Link></Button></CardContent></Card>}</section>
      </div>
    </div>
  );
}