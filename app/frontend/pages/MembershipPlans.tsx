import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import { useModelIndex, useModelCreate, useModelUpdate, useModelDelete, useBaseOwnerId } from "@rhino-project/core/hooks";

export default function MembershipPlans() {
  const { gym_slug: gymSlug = "apex-fitness" } = useParams();
  const organizationId = useBaseOwnerId();
  const [query, setQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<number | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [error, setError] = useState("");

  // Fetch plans
  const { resources: plansData, isPending, error: fetchError, refetch } = useModelIndex("membership_plan");
  const plans = plansData?.results ?? [];

  // Mutations
  const { mutateAsync: createPlan } = useModelCreate("membership_plan", {
    onSuccess: () => {
      setIsAdding(false);
      resetForm();
      refetch();
    }
  });

  const { mutateAsync: updatePlan } = useModelUpdate("membership_plan", {
    onSuccess: () => {
      setEditingPlanId(null);
      resetForm();
      refetch();
    }
  });

  const { mutateAsync: deletePlan } = useModelDelete("membership_plan", {
    onSuccess: () => {
      refetch();
    }
  });

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStatus("active");
    setError("");
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) {
      setError("Name and Price are required.");
      return;
    }
    try {
      await createPlan({
        name,
        description,
        price: parseFloat(price),
        status,
        organization_id: organizationId
      });
    } catch (err: any) {
      setError(err?.response?.data?.errors?.[0] || err?.message || "Failed to create plan.");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlanId) return;
    try {
      await updatePlan({
        id: editingPlanId,
        name,
        description,
        price: parseFloat(price),
        status
      });
    } catch (err: any) {
      setError(err?.response?.data?.errors?.[0] || err?.message || "Failed to update plan.");
    }
  };

  const startEdit = (plan: any) => {
    setEditingPlanId(plan.id);
    setName(plan.name);
    setDescription(plan.description || "");
    setPrice(plan.price?.toString() || "");
    setStatus(plan.status || "active");
    setIsAdding(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await deletePlan(id);
      } catch (err: any) {
        alert(err?.response?.data?.errors?.[0] || err?.message || "Failed to delete plan.");
      }
    }
  };

  const filteredPlans = plans.filter((plan: any) =>
    plan.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full flex-col gap-6 min-w-0">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Membership Plans</h1>
            <p className="text-muted-foreground text-sm">Manage subscription tiers and pricing for your gym.</p>
          </div>
          {!isAdding && editingPlanId === null && (
            <Button onClick={() => { resetForm(); setIsAdding(true); }}>
              <Plus className="mr-2 size-4" /> Add Plan
            </Button>
          )}
        </section>

        {/* Add/Edit Form */}
        {(isAdding || editingPlanId !== null) && (
          <Card className="max-w-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{isAdding ? "Create New Plan" : "Edit Plan"}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => { setIsAdding(false); setEditingPlanId(null); resetForm(); }}>
                <X className="size-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={isAdding ? handleAddSubmit : handleEditSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Plan Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => { setIsAdding(false); setEditingPlanId(null); resetForm(); }}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isAdding ? "Create Plan" : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Search and Table */}
        <section className="space-y-4">
          <div className="flex max-w-sm items-center gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search plans..."
            />
          </div>

          {isPending ? (
            <div className="text-center py-8 text-muted-foreground">Loading plans...</div>
          ) : fetchError ? (
            <Alert variant="destructive">
              <AlertDescription>Failed to load plans.</AlertDescription>
            </Alert>
          ) : filteredPlans.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-8 text-center">
              <p className="text-muted-foreground">No plans found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlans.map((plan: any) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.name}</TableCell>
                      <TableCell className="text-muted-foreground">{plan.description || "-"}</TableCell>
                      <TableCell>${plan.price}</TableCell>
                      <TableCell>
                        <Badge variant={plan.status === "active" ? "default" : "secondary"}>
                          {plan.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="icon" variant="ghost" onClick={() => startEdit(plan)}>
                            <Edit2 className="size-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(plan.id)}>
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
