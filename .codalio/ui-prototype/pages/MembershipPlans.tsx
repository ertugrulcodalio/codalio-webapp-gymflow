import { useParams } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

import React from "react";

import { Plus } from "lucide-react";
import { useState } from "react";

export default function MembershipPlans() {
    const [query, setQuery] = useState("");
    const [added, setAdded] = useState(false);
    const [plans, setPlans] = useState([{name:"Flex",price:"$39",members:212,status:"Active"},{name:"Unlimited",price:"$69",members:270,status:"Active"}]);
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full flex-col gap-6 min-w-0">
          <section><h1 className="mb-5 text-3xl font-bold">Membership plans</h1><div className="flex flex-col gap-3 sm:flex-row sm:justify-between"><Input className="max-w-sm" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search plans" /><Button onClick={() => setAdded(true)}><Plus className="mr-2 size-4" />Add plan</Button></div>{added && <p className="mt-3 text-sm text-primary">New plan form is ready below.</p>}</section>
  <section className="overflow-x-auto rounded-lg border border-border"><Table><TableHeader><TableRow><TableHead>Plan</TableHead><TableHead>Price</TableHead><TableHead>Cycle</TableHead><TableHead>Members</TableHead><TableHead>Status</TableHead><TableHead /></TableRow></TableHeader><TableBody>{plans.map((plan) => <TableRow key={plan.name}><TableCell className="font-medium">{plan.name}</TableCell><TableCell>{plan.price}</TableCell><TableCell>Monthly</TableCell><TableCell>{plan.members}</TableCell><TableCell><Badge>{plan.status}</Badge></TableCell><TableCell><Button size="sm" variant="ghost" onClick={() => setPlans(plans.filter((item) => item.name !== plan.name))}>Archive</Button></TableCell></TableRow>)}</TableBody></Table></section>
      </div>
    </div>
  );
}