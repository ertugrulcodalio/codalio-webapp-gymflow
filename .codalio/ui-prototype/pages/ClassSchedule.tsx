import { useParams } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

import React from "react";

import { Clock, Users } from "lucide-react";
import { useState } from "react";

export default function ClassSchedule() {
    const [search, setSearch] = useState("");
    const [day, setDay] = useState("all");
    const [classes, setClasses] = useState([{ id: "1", name: "Strength Circuit", day: "Monday", time: "6:00 PM", trainer: "Maya", spots: 8, booked: false }, { id: "2", name: "Power Yoga", day: "Tuesday", time: "7:00 AM", trainer: "Nina", spots: 0, booked: false }, { id: "3", name: "HIIT Express", day: "Wednesday", time: "5:30 PM", trainer: "Leo", spots: 4, booked: false }]);
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full flex-col gap-6 min-w-0">
          <section><h1 className="mb-5 text-3xl font-bold tracking-tight">Class schedule</h1><div className="flex flex-col gap-3 sm:flex-row"><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search classes" /><Select value={day} onValueChange={setDay}><SelectTrigger><SelectValue placeholder="Any day" /></SelectTrigger><SelectContent><SelectItem value="all">Any day</SelectItem><SelectItem value="Monday">Monday</SelectItem><SelectItem value="Tuesday">Tuesday</SelectItem></SelectContent></Select><Button variant="outline" onClick={() => { setSearch(""); setDay("all"); }}>Reset filters</Button></div></section>
  <section aria-live="polite"><div className="grid gap-4 lg:grid-cols-3">{classes.map((item) => <Card key={item.id}><CardContent className="p-5"><div className="flex justify-between gap-3"><h2 className="font-semibold">{item.name}</h2><Badge variant={item.spots === 0 ? "destructive" : "secondary"}>{item.spots === 0 ? "Full" : `${item.spots} spots`}</Badge></div><p className="mt-3 flex gap-2 text-sm text-muted-foreground"><Clock className="size-4" />{item.day} · {item.time}</p><p className="mt-2 flex gap-2 text-sm text-muted-foreground"><Users className="size-4" />with {item.trainer}</p><Button className="mt-5 w-full" disabled={item.spots === 0 || item.booked} onClick={() => setClasses(classes.map((entry) => entry.id === item.id ? { ...entry, spots: entry.spots - 1, booked: true } : entry))}>{item.booked ? "Booked" : item.spots === 0 ? "Class is full" : "Book class"}</Button></CardContent></Card>)}</div></section>
      </div>
    </div>
  );
}