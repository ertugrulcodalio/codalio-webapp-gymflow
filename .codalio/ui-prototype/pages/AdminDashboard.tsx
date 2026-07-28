import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

import { CalendarPlus, ChartNoAxesCombined, CircleAlert, ClipboardList, CreditCard, Users } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function AdminDashboard() {
    const { gym_slug: gymSlug = "apex-fitness" } = useParams();
    const [range, setRange] = useState("7");
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full flex-col gap-6 min-w-0">
          <section><h1 className="mb-5 text-3xl font-bold tracking-tight">Operations overview</h1><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[{label:"Active memberships",value:"482",icon:CreditCard},{label:"Bookings this week",value:"238",icon:ClipboardList},{label:"Average attendance",value:"84%",icon:ChartNoAxesCombined},{label:"Classes at capacity",value:"6",icon:CircleAlert}].map((item) => { const Icon = item.icon; return <Card key={item.label}><CardContent className="p-5"><Icon className="size-5 text-primary" /><p className="mt-4 text-2xl font-bold">{item.value}</p><p className="text-sm text-muted-foreground">{item.label}</p></CardContent></Card>; })}</div></section>
  <section><h2 className="mb-5 text-2xl font-bold">Attendance and booking trends</h2><div className="grid gap-4 lg:grid-cols-3"><Card className="lg:col-span-2"><CardHeader><CardTitle>Attendance trend</CardTitle><Select value={range} onValueChange={setRange}><SelectTrigger className="w-32"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="7">7 days</SelectItem><SelectItem value="30">30 days</SelectItem><SelectItem value="90">90 days</SelectItem></SelectContent></Select></CardHeader><CardContent><div className="flex h-36 items-end gap-3">{[48,72,58,91,68,82,76].map((height,index) => <div key={index} className="flex-1 rounded-t bg-primary/80" style={{height:`${height}%`}} />)}</div></CardContent></Card><Card><CardContent className="space-y-3 p-5"><h3 className="font-semibold">Quick actions</h3><Button asChild className="w-full justify-start"><Link to={`/tenant/${gymSlug}/admin/classes`}><CalendarPlus className="mr-2 size-4" />Add class</Link></Button><Button asChild variant="outline" className="w-full justify-start"><Link to={`/tenant/${gymSlug}/admin/trainers`}><Users className="mr-2 size-4" />Manage trainers</Link></Button><Button asChild variant="outline" className="w-full justify-start"><Link to={`/tenant/${gymSlug}/admin/bookings`}><ClipboardList className="mr-2 size-4" />Review bookings</Link></Button></CardContent></Card></div></section>
      </div>
    </div>
  );
}