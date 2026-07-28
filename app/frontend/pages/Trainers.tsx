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

export default function Trainers() {
  const { gym_slug: gymSlug = "apex-fitness" } = useParams();
  const organizationId = useBaseOwnerId();
  const [query, setQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingTrainerId, setEditingTrainerId] = useState<number | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [error, setError] = useState("");

  // Fetch trainers
  const { resources: trainersData, isPending, error: fetchError, refetch } = useModelIndex("trainer");
  const trainers = trainersData?.results ?? [];

  // Mutations
  const { mutateAsync: createTrainer } = useModelCreate("trainer", {
    onSuccess: () => {
      setIsAdding(false);
      resetForm();
      refetch();
    }
  });

  const { mutateAsync: updateTrainer } = useModelUpdate("trainer", {
    onSuccess: () => {
      setEditingTrainerId(null);
      resetForm();
      refetch();
    }
  });

  const { mutateAsync: deleteTrainer } = useModelDelete("trainer", {
    onSuccess: () => {
      refetch();
    }
  });

  const resetForm = () => {
    setName("");
    setBio("");
    setStatus("active");
    setError("");
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setError("Name is required.");
      return;
    }
    try {
      await createTrainer({
        name,
        bio,
        status,
        organization_id: organizationId
      });
    } catch (err: any) {
      setError(err?.response?.data?.errors?.[0] || err?.message || "Failed to create trainer.");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrainerId) return;
    try {
      await updateTrainer({
        id: editingTrainerId,
        name,
        bio,
        status
      });
    } catch (err: any) {
      setError(err?.response?.data?.errors?.[0] || err?.message || "Failed to update trainer.");
    }
  };

  const startEdit = (trainer: any) => {
    setEditingTrainerId(trainer.id);
    setName(trainer.name);
    setBio(trainer.bio || "");
    setStatus(trainer.status || "active");
    setIsAdding(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this trainer?")) {
      try {
        await deleteTrainer(id);
      } catch (err: any) {
        alert(err?.response?.data?.errors?.[0] || err?.message || "Failed to delete trainer.");
      }
    }
  };

  const filteredTrainers = trainers.filter((trainer: any) =>
    trainer.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full flex-col gap-6 min-w-0">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Trainers</h1>
            <p className="text-muted-foreground text-sm">Manage trainers and instructors for your gym.</p>
          </div>
          {!isAdding && editingTrainerId === null && (
            <Button onClick={() => { resetForm(); setIsAdding(true); }}>
              <Plus className="mr-2 size-4" /> Add Trainer
            </Button>
          )}
        </section>

        {/* Add/Edit Form */}
        {(isAdding || editingTrainerId !== null) && (
          <Card className="max-w-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{isAdding ? "Create New Trainer" : "Edit Trainer"}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => { setIsAdding(false); setEditingTrainerId(null); resetForm(); }}>
                <X className="size-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={isAdding ? handleAddSubmit : handleEditSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Trainer Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
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
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => { setIsAdding(false); setEditingTrainerId(null); resetForm(); }}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isAdding ? "Create Trainer" : "Save Changes"}
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
              placeholder="Search trainers..."
            />
          </div>

          {isPending ? (
            <div className="text-center py-8 text-muted-foreground">Loading trainers...</div>
          ) : fetchError ? (
            <Alert variant="destructive">
              <AlertDescription>Failed to load trainers.</AlertDescription>
            </Alert>
          ) : filteredTrainers.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-8 text-center">
              <p className="text-muted-foreground">No trainers found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trainer Name</TableHead>
                    <TableHead>Bio</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrainers.map((trainer: any) => (
                    <TableRow key={trainer.id}>
                      <TableCell className="font-medium">{trainer.name}</TableCell>
                      <TableCell className="text-muted-foreground">{trainer.bio || "-"}</TableCell>
                      <TableCell>
                        <Badge variant={trainer.status === "active" ? "default" : "secondary"}>
                          {trainer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="icon" variant="ghost" onClick={() => startEdit(trainer)}>
                            <Edit2 className="size-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(trainer.id)}>
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
