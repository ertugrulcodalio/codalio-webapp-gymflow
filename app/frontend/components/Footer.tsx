
import { Link, useParams } from "react-router-dom";
      export default function Footer() {
const { gym_slug: gymSlug = "apex-fitness" } = useParams();
      return (
          <footer className="border-t border-border bg-card px-4 py-8 text-sm text-muted-foreground"><div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between"><p>© {new Date().getFullYear()} Apex Fitness · GymFlow member portal</p><div className="flex gap-4"><Link to={`/tenant/${gymSlug}`} className="hover:text-foreground">Privacy</Link><Link to={`/tenant/${gymSlug}`} className="hover:text-foreground">Terms</Link><Link to={`/tenant/${gymSlug}`} className="hover:text-foreground">Support</Link></div></div></footer>
      );
      }