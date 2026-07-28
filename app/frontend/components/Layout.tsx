
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Button } from "./ui/button";

import { CalendarDays, Dumbbell, Home, LayoutDashboard, Ticket, Users, CreditCard, Palette } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { useUser, useRoles } from "@rhino-project/core/hooks";

export default function Layout() {
  const { gym_slug: gymSlug = "apex-fitness" } = useParams();
  const location = useLocation();
  const user = useUser();
  const roles = useRoles();

  const navItems = [
    { label: "Gym Home", href: `/tenant/${gymSlug}`, icon: Home, show: true },
    
    // Member items
    { label: "Dashboard", href: `/tenant/${gymSlug}/dashboard`, icon: LayoutDashboard, show: roles.includes("gym_member") },
    { label: "Classes", href: `/tenant/${gymSlug}/classes`, icon: CalendarDays, show: roles.includes("gym_member") },
    { label: "My bookings", href: `/tenant/${gymSlug}/bookings`, icon: Ticket, show: roles.includes("gym_member") },
    
    // Admin items
    { label: "Admin Dashboard", href: `/tenant/${gymSlug}/admin/dashboard`, icon: LayoutDashboard, show: roles.includes("gym_staff") },
    { label: "Membership Plans", href: `/tenant/${gymSlug}/admin/plans`, icon: CreditCard, show: roles.includes("gym_staff") },
    { label: "Trainers", href: `/tenant/${gymSlug}/admin/trainers`, icon: Users, show: roles.includes("gym_staff") },
    { label: "Classes Management", href: `/tenant/${gymSlug}/admin/classes`, icon: CalendarDays, show: roles.includes("gym_staff") },
    { label: "Bookings Management", href: `/tenant/${gymSlug}/admin/bookings`, icon: Ticket, show: roles.includes("gym_staff") },
    { label: "Branding", href: `/tenant/${gymSlug}/admin/branding`, icon: Palette, show: roles.includes("gym_staff") },
  ].filter(item => item.show);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex min-h-[calc(100vh-64px)]">
        <aside className="hidden w-64 shrink-0 border-r border-border bg-card p-4 md:block">
          <p className="mb-5 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">GymFlow</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.href;
              return (
                <Button key={item.href} asChild variant={active ? "default" : "ghost"} className="w-full justify-start gap-3">
                  <Link to={item.href}>
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0 flex-1">
          <div className="w-full p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}