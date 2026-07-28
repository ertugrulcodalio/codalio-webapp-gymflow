import React from "react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Login() {
    const { gym_slug: gymSlug = "apex-fitness" } = useParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleSubmit = (event: React.FormEvent) => { event.preventDefault(); setError(""); if (!email || !password) { setError("Please enter your email and password."); return; } setLoading(true); window.setTimeout(() => { setLoading(false); navigate(`/tenant/${gymSlug}/dashboard`); }, 600); };
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full flex-col py-8 min-w-0">
          <section className="mx-auto w-full max-w-md"><Card><CardHeader><CardTitle className="text-2xl">Welcome back</CardTitle><p className="text-sm text-muted-foreground">Sign in to manage your fitness journey.</p></CardHeader><CardContent><form onSubmit={handleSubmit} className="space-y-5"><div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /></div><div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>{error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}<Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</Button><p className="text-center text-sm text-muted-foreground">New to Apex? <Link className="font-medium text-primary hover:underline" to={`/tenant/${gymSlug}/register`}>Create an account</Link></p></form></CardContent></Card></section>
      </div>
    </div>
  );
}