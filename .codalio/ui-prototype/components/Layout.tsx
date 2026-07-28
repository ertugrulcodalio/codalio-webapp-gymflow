
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Button } from "./ui/button";

import { CalendarDays, Dumbbell, Home, LayoutDashboard, Ticket } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

        export default function Layout({ item }) {
  const { gym_slug: gymSlug = "apex-fitness" } = useParams();
  const location = useLocation();
  const navItems = [
  { label: "Gym Home", href: `/tenant/${gymSlug}`, icon: Home },
  { label: "Dashboard", href: `/tenant/${gymSlug}/dashboard`, icon: LayoutDashboard },
  { label: "Classes", href: `/tenant/${gymSlug}/classes`, icon: CalendarDays },
  { label: "My bookings", href: `/tenant/${gymSlug}/bookings`, icon: Ticket },
  { label: "Admin", href: `/tenant/${gymSlug}/admin/dashboard`, icon: Dumbbell },
  ];
        return (
            <div className="min-h-screen bg-background text-foreground"><Header /><div className="flex min-h-[calc(100vh-64px)]"><aside className="hidden w-64 shrink-0 border-r border-border bg-card p-4 md:block"><p className="mb-5 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">GymFlow</p><nav className="space-y-1">{navItems.map((item) => { const Icon = item.icon; const active = location.pathname === item.href; return <Button key={item.href} asChild variant={active ? "default" : "ghost"} className="w-full justify-start gap-3"><Link to={item.href}><Icon className="size-4" />{item.label}</Link></Button>; })}</nav></aside><main className="min-w-0 flex-1"><div className="w-full p-4 md:p-6 lg:p-8"><Outlet /></div><Footer /></main></div></div>
        );
        }