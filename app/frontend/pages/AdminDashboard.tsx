import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { CalendarPlus, ChartNoAxesCombined, CircleAlert, ClipboardList, CreditCard, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useModelIndex } from "@rhino-project/core/hooks";

export default function AdminDashboard() {
  const { gym_slug: gymSlug = "apex-fitness" } = useParams();
  const [range, setRange] = useState("7");

  // Fetch users, bookings, and classes
  const { resources: usersData, isPending: usersPending } = useModelIndex("user");
  const users = usersData?.results ?? [];

  const { resources: bookingsData, isPending: bookingsPending } = useModelIndex("booking");
  const bookings = bookingsData?.results ?? [];

  const { resources: classesData, isPending: classesPending } = useModelIndex("gym_class");
  const classes = classesData?.results ?? [];

  // Calculate metrics
  const activeMemberships = users.filter((u: any) => u.membership_plan_id !== null).length;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const bookingsThisWeek = bookings.filter((b: any) => b.created_at && new Date(b.created_at) >= oneWeekAgo).length;

  const attendanceBookings = bookings.filter((b: any) => b.attendance_status === "attended" || b.attendance_status === "no_show");
  const attendedCount = bookings.filter((b: any) => b.attendance_status === "attended").length;
  const averageAttendance = attendanceBookings.length > 0 ? Math.round((attendedCount / attendanceBookings.length) * 100) : 0;

  const classesAtCapacity = classes.filter((c: any) => {
    const activeBookings = bookings.filter((b: any) => b.gym_class_id === c.id && b.status === "confirmed");
    return activeBookings.length >= c.capacity;
  }).length;

  const isPending = usersPending || bookingsPending || classesPending;

  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full flex-col gap-6 min-w-0">
        <section>
          <h1 className="mb-5 text-3xl font-bold tracking-tight">Operations overview</h1>
          {isPending ? (
            <div className="text-center py-8 text-muted-foreground">Loading metrics...</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Active memberships", value: activeMemberships.toString(), icon: CreditCard },
                { label: "Bookings this week", value: bookingsThisWeek.toString(), icon: ClipboardList },
                { label: "Average attendance", value: `${averageAttendance}%`, icon: ChartNoAxesCombined },
                { label: "Classes at capacity", value: classesAtCapacity.toString(), icon: CircleAlert }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.label}>
                    <CardContent className="p-5">
                      <Icon className="size-5 text-primary" />
                      <p className="mt-4 text-2xl font-bold">{item.value}</p>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-5 text-2xl font-bold">Attendance and booking trends</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Attendance trend</CardTitle>
                <select
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
                  className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                </select>
              </CardHeader>
              <CardContent>
                <div className="flex h-36 items-end gap-3">
                  {[48, 72, 58, 91, 68, 82, 76].map((height, index) => (
                    <div key={index} className="flex-1 rounded-t bg-primary/80" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-3 p-5">
                <h3 className="font-semibold">Quick actions</h3>
                <Button asChild className="w-full justify-start">
                  <Link to={`/tenant/${gymSlug}/admin/classes`}>
                    <CalendarPlus className="mr-2 size-4" />Add class
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to={`/tenant/${gymSlug}/admin/trainers`}>
                    <Users className="mr-2 size-4" />Manage trainers
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to={`/tenant/${gymSlug}/admin/bookings`}>
                    <ClipboardList className="mr-2 size-4" />Review bookings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
