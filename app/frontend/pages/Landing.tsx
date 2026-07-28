import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

import { ArrowRight, CalendarDays, Dumbbell, ShieldCheck, Smartphone } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function Landing() {
    const { gym_slug: gymSlug = "apex-fitness" } = useParams();
  return (
   <div className="min-h-screen w-full bg-background text-foreground min-w-0 overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-8 md:px-6 md:py-12 min-w-0">
          <section className="rounded-2xl bg-gradient-to-br from-primary to-foreground p-8 text-primary-foreground shadow-md md:p-14"><Badge className="mb-5 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/15"><Dumbbell className="mr-1 size-3.5" />Apex Fitness member portal</Badge><div className="max-w-2xl"><h1 className="text-4xl font-bold tracking-tight md:text-6xl">Train stronger at your gym</h1><p className="mt-5 text-lg leading-8 text-primary-foreground/85">Sign in or join Apex Fitness to book classes, track your routine, and stay connected.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"><Link to={`/tenant/${gymSlug}/register`}>Create account <ArrowRight className="ml-2 size-4" /></Link></Button><Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to={`/tenant/${gymSlug}/login`}>Sign in</Link></Button></div></div></section>
  <section><div className="mb-6"><p className="text-sm font-semibold uppercase tracking-wider text-primary">A better member experience</p><h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">Everything you need to keep moving</h2></div><div className="grid gap-4 md:grid-cols-3">{[{ icon: CalendarDays, title: "Book in seconds", copy: "See live availability before you reserve." }, { icon: ShieldCheck, title: "Your gym, your data", copy: "Your account stays securely within your gym." }, { icon: Smartphone, title: "Built for mobile", copy: "Manage your sessions from anywhere." }].map((item) => { const Icon = item.icon; return <Card key={item.title} className="transition-colors hover:border-primary/40"><CardContent className="p-6"><span className="mb-5 grid size-11 place-items-center rounded-lg bg-accent text-accent-foreground"><Icon className="size-5" /></span><h3 className="font-semibold text-foreground">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.copy}</p></CardContent></Card>; })}</div></section>
      </div>
    </div>
  );
}