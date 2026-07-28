import React from "react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSignUpAction } from "@rhino-project/core/queries";
import { useModelIndex } from "@rhino-project/core/hooks";

export default function Register() {
    const { gym_slug: gymSlug = "apex-fitness" } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [waiver, setWaiver] = useState(false);
    const [error, setError] = useState("");
    const { mutateAsync: signUp } = useSignUpAction();
    const { resources: orgsData } = useModelIndex('organization');
    const orgs = orgsData?.results ?? [];
    const currentOrg = orgs.find(o => o.name.toLowerCase().replace(/\s+/g, '-') === gymSlug);

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      if (!waiver) {
        setError("Please accept the waiver to continue.");
        return;
      }
      if (!currentOrg) {
        setError("Gym not found.");
        return;
      }
      setError("");
      try {
        await signUp({
          name,
          email,
          password,
          organization_id: currentOrg.id
        });
        navigate(`/tenant/${gymSlug}/dashboard`);
      } catch (err: any) {
        setError(err?.response?.data?.errors?.full_messages?.[0] || err?.message || "Registration failed.");
      }
    };
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full flex-col py-8 min-w-0">
          <section className="mx-auto w-full max-w-lg"><Card><CardHeader><CardTitle className="text-2xl">Join Apex Fitness</CardTitle><p className="text-sm text-muted-foreground">Create your member account in a minute.</p></CardHeader><CardContent><form onSubmit={handleSubmit} className="space-y-5"><div className="space-y-2"><Label htmlFor="name">Full name</Label><Input id="name" value={name} onChange={(event) => setName(event.target.value)} required /></div><div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div><div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required /></div><div className="flex items-start gap-3"><Checkbox id="waiver" checked={waiver} onCheckedChange={(value) => setWaiver(value === true)} /><Label htmlFor="waiver" className="leading-5">I agree to the gym terms and liability waiver.</Label></div>{error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}<Button className="w-full" type="submit">Create account</Button><p className="text-center text-sm text-muted-foreground">Already a member? <Link className="font-medium text-primary hover:underline" to={`/tenant/${gymSlug}/login`}>Sign in</Link></p></form></CardContent></Card></section>
      </div>
    </div>
  );
}