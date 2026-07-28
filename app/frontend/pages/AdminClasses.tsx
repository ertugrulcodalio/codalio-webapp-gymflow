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

export default function AdminClasses() {
  const { gym_slug: gymSlug = "apex-fitness" } = useParams();
  const organizationId = useBaseOwnerId();
  const [query, setQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingClassId, setEditingClassId] = useState<number | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [trainerId, setTrainerId] = useState("");
  const [status, setStatus] = useState<"scheduled" | "cancelled" | "completed">("scheduled");
  const [error, setError] = useState("");

  // Fetch classes and trainers
  const { resources: classesData, isPending, error: fetchError, refetch } = useModelIndex("gym_class");
  const classes = classesData?.results ?? [];

  const { resources: trainersData } = useModelIndex("trainer");
  const trainers = trainersData?.results ?? [];

  // Mutations
  const { mutateAsync: createClass } = useModelCreate("gym_class", {
    onSuccess: () => {
      setIsAdding(false);
      resetForm();
      refetch();
    }
  });

  const { mutateAsync: updateClass } = useModelUpdate("gym_class", {
    onSuccess: () => {
      setEditingClassId(null);
      resetForm();
      refetch();
    }
  });

  const { mutateAsync: deleteClass } = useModelDelete("gym_class", {
    onSuccess: () => {
      refetch();
    }
  });

  const resetForm = () => {
    setName("");
    setDescription("");
    setCapacity("");
    setStartTime("");
    setEndTime("");
    setTrainerId("");
    setStatus("scheduled");
    setError("");
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !capacity || !startTime || !endTime || !trainerId) {
      setError("All fields are required.");
      return;
    }
    try {
      await createClass({
        name,
        description,
        capacity: parseInt(capacity),
        start_time: startTime,
        end_time: endTime,
        trainer_id: parseInt(trainerId),
        status,
        organization_id: organizationId
      });
    } catch (err: any) {
      setError(err?.response?.data?.errors?.[0] || err?.message || "Failed to create class.");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClassId) return;
    try {
      await updateClass({
        id: editingClassId,
        name,
        description,
        capacity: parseInt(capacity),
        start_time: startTime,
        end_time: endTime,
        trainer_id: parseInt(trainerId),
        status
      });
    } catch (err: any) {
      setError(err?.response?.data?.errors?.[0] || err?.message || "Failed to update class.");
    }
  };

  const startEdit = (gymClass: any) => {
    setEditingClassId(gymClass.id);
    setName(gymClass.name);
    setDescription(gymClass.description || "");
    setCapacity(gymClass.capacity?.toString() || "");
    setStartTime(gymClass.start_time ? new Date(gymClass.start_time).toISOString().slice(0, 16) : "");
    setEndTime(gymClass.end_time ? new Date(gymClass.end_time).toISOString().slice(0, 16) : "");
    setTrainerId(gymClass.trainer_id?.toString() || "");
    setStatus(gymClass.status || "scheduled");
    setIsAdding(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        await deleteClass(id);
      } catch (err: any) {
        alert(err?.response?.data?.errors?.[0] || err?.message || "Failed to delete class.");
      }
    }
  };

  const filteredClasses = classes.filter((gymClass: any) =>
    gymClass.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full flex-col gap-6 min-w-0">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Classes Management</h1>
            <p className="text-muted-foreground text-sm">Manage schedules, capacities, and trainers for gym classes.</p>
          </div>
          {!isAdding && editingClassId === null && (
            <Button onClick={() => { resetForm(); setIsAdding(true); }}>
              <Plus className="mr-2 size-4" /> Add Class
            </Button>
          )}
        </section>

        {/* Add/Edit Form */}
        {(isAdding || editingClassId !== null) && (
          <Card className="max-w-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{isAdding ? "Create New Class" : "Edit Class"}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => { setIsAdding(false); setEditingClassId(null); resetForm(); }}>
                <X className="size-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={isAdding ? handleAddSubmit : handleEditSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Class Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trainer">Trainer</Label>
                    <select
                      id="trainer"
                      value={trainerId}
                      onChange={(e) => setTrainerId(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Select Trainer</option>
                      {trainers.map((t: any) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input id="startTime" type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input id="endTime" type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => { setIsAdding(false); setEditingClassId(null); resetForm(); }}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isAdding ? "Create Class" : "Save Changes"}
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
              placeholder="Search classes..."
            />
          </div>

          {isPending ? (
            <div className="text-center py-8 text-muted-foreground">Loading classes...</div>
          ) : fetchError ? (
            <Alert variant="destructive">
              <AlertDescription>Failed to load classes.</AlertDescription>
            </Alert>
          ) : filteredClasses.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-8 text-center">
              <p className="text-muted-foreground">No classes found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class Name</TableHead>
                    <TableHead>Trainer</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClasses.map((gymClass: any) => {
                    const trainer = trainers.find((t: any) => t.id === gymClass.trainer_id);
                    return (
                      <TableRow key={gymClass.id}>
                        <TableCell className="font-medium">{gymClass.name}</TableCell>
                        <TableCell>{trainer ? trainer.name : "Unknown"}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {gymClass.start_time ? new Date(gymClass.start_time).toLocaleString() : "-"}
                        </TableCell>
                        <TableCell>{gymClass.capacity}</TableCell>
                        <TableCell>
                          <Badge variant={gymClass.status === "scheduled" ? "default" : gymClass.status === "completed" ? "secondary" : "destructive"}>
                            {gymClass.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost" onClick={() => startEdit(gymClass)}>
                              <Edit2 className="size-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(gymClass.id)}>
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
