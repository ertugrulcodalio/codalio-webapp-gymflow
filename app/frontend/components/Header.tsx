
import { Link, useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

import { Dumbbell, LogOut, Menu, UserCog } from "lucide-react";
import { useUser } from "@rhino-project/core/hooks";
import { useSignOutAction } from "@rhino-project/core/queries";

export default function Header() {
  const { gym_slug: gymSlug = "apex-fitness" } = useParams();
  const user = useUser();
  const navigate = useNavigate();
  const { mutateAsync: signOut } = useSignOutAction();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate(`/tenant/${gymSlug}`);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const userInitials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-card/95 px-4 text-foreground backdrop-blur md:px-6">
      <Link to={`/tenant/${gymSlug}`} className="flex items-center gap-2 font-semibold">
        <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Dumbbell className="size-5" />
        </span>
        <span>Apex Fitness</span>
      </Link>
      <div className="flex items-center gap-2">
        {!user ? (
          <>
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to={`/tenant/${gymSlug}/login`}>Sign in</Link>
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to={`/tenant/${gymSlug}/register`}>Join now</Link>
            </Button>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open account menu">
                <Avatar className="size-8">
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.name || user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserCog className="mr-2 size-4" />Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 size-4" />Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Button variant="ghost" size="icon" className="sm:hidden" aria-label="Open navigation">
          <Menu className="size-5" />
        </Button>
      </div>
    </header>
  );
}