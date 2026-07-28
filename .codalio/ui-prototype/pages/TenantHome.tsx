import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

import { ArrowRight, CalendarDays, Clock, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function TenantHome() {
    const { gym_slug: gymSlug = "apex-fitness" } = useParams();
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full flex-col gap-8 min-w-0">
          <section className="rounded-2xl bg-gradient-to-br from-primary to-foreground p-7 text-primary-foreground md:p-10"><Badge className="bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/15">Your local training community</Badge><h1 className="mt-5 text-4xl font-bold tracking-tight">Welcome to Apex Fitness</h1><p className="mt-3 max-w-xl text-primary-foreground/85">Your local home for classes, training, and progress.</p><div className="mt-7 flex flex-wrap gap-3"><Button asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"><Link to={`/tenant/${gymSlug}/classes`}>View class schedule <CalendarDays className="ml-2 size-4" /></Link></Button><Button asChild variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to={`/tenant/${gymSlug}/login`}>Member login <ArrowRight className="ml-2 size-4" /></Link></Button></div></section>
  <section><div className="mb-5 flex items-end justify-between"><div><h2 className="text-2xl font-bold text-foreground">Popular ways to train</h2><p className="mt-1 text-muted-foreground">Find your next session.</p></div><Button asChild variant="ghost"><Link to={`/tenant/${gymSlug}/classes`}>Explore classes</Link></Button></div><div className="grid gap-4 md:grid-cols-3">{[{name:"Strength Circuit",time:"Mon · 6:00 PM",spots:"8 spots left"},{name:"Power Yoga",time:"Tue · 7:00 AM",spots:"12 spots left"},{name:"HIIT Express",time:"Wed · 5:30 PM",spots:"4 spots left"}].map((item) => <Card key={item.name}><CardContent className="p-5"><h3 className="font-semibold text-foreground">{item.name}</h3><p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><Clock className="size-4" />{item.time}</p><p className="mt-2 flex items-center gap-2 text-sm text-primary"><Users className="size-4" />{item.spots}</p></CardContent></Card>)}</div></section>
      </div>
    </div>
  );
}