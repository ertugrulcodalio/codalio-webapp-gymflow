import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Plus, Trash2, Edit2, X, Check, XCircle } from "lucide-react";
import { useModelIndex, useModelCreate, useModelUpdate, useModelDelete, useBaseOwnerId } from "@rhino-project/core/hooks";

export default function BookingsManagement() {
  const { gym_slug: gymSlug = "apex-fitness" } = useParams();
  const organizationId = useBaseOwnerId();
  const [query, setQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [userId, setUserId] = useState("");
  const [gymClassId, setGymClassId] = useState("");
  const [status, setStatus] = useState<"confirmed" | "cancelled">("confirmed");
  const [attendanceStatus, setAttendanceStatus] = useState<"pending" | "attended" | "no_show">("pending");
  const [error, setError] = useState("");

  // Fetch bookings, users, and classes
  const { resources: bookingsData, isPending, error: fetchError, refetch } = useModelIndex("booking");
  const bookings = bookingsData?.results ?? [];

  const { resources: usersData } = useModelIndex("user");
  const users = usersData?.results ?? [];

  const { resources: classesData } = useModelIndex("gym_class");
  const classes = classesData?.results ?? [];

  // Mutations
  const { mutateAsync: createBooking } = useModelCreate("booking", {
    onSuccess: () => {
      setIsAdding(false);
      resetForm();
      refetch();
    }
  });

  const { mutateAsync: updateBooking } = useModelUpdate("booking", {
    onSuccess: () => {
      refetch();
    }
  });

  const { mutateAsync: deleteBooking } = useModelDelete("booking", {
    onSuccess: () => {
      refetch();
    }
  });

  const resetForm = () => {
    setUserId("");
    setGymClassId("");
    setStatus("confirmed");
    setAttendanceStatus("pending");
    setError("");
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !gymClassId) {
      setError("User and Class are required.");
      return;
    }
    try {
      await createBooking({
        user_id: parseInt(userId),
        gym_class_id: parseInt(gymClassId),
        status,
        attendance_status: attendanceStatus,
        organization_id: organizationId
      });
    } catch (err: any) {
      setError(err?.response?.data?.errors?.[0] || err?.message || "Failed to create booking.");
    }
  };

  const handleUpdateAttendance = async (booking: any, newAttendance: "pending" | "attended" | "no_show") => {
    try {
      await updateBooking({
        id: booking.id,
        attendance_status: newAttendance
      });
    } catch (err: any) {
      alert(err?.response?.data?.errors?.[0] || err?.message || "Failed to update attendance.");
    }
  };

  const handleCancelBooking = async (booking: any) => {
    try {
      await updateBooking({
        id: booking.id,
        status: "cancelled"
      });
    } catch (err: any) {
      alert(err?.response?.data?.errors?.[0] || err?.message || "Failed to cancel booking.");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteBooking(id);
      } catch (err: any) {
        alert(err?.response?.data?.errors?.[0] || err?.message || "Failed to delete booking.");
      }
    }
  };

  const filteredBookings = bookings.filter((booking: any) => {
    const user = users.find((u: any) => u.id === booking.user_id);
    const gymClass = classes.find((c: any) => c.id === booking.gym_class_id);
    const userName = user?.name || "";
    const className = gymClass?.name || "";
    return userName.toLowerCase().includes(query.toLowerCase()) || className.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="flex w-full flex-col gap-6 min-w-0">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Bookings Management</h1>
            <p className="text-muted-foreground text-sm">View and manage all member bookings, attendance, and capacity overrides.</p>
          </div>
          {!isAdding && (
            <Button onClick={() => { resetForm(); setIsAdding(true); }}>
              <Plus className="mr-2 size-4" /> Add Booking
            </Button>
          )}
        </section>

        {/* Add Form */}
        {isAdding && (
          <Card className="max-w-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Create New Booking</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => { setIsAdding(false); resetForm(); }}>
                <X className="size-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user">Member</Label>
                    <select
                      id="user"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Select Member</option>
                      {users.map((u: any) => (
                        <option key={u.id} value={u.id}>{u.name || u.email}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gymClass">Class</Label>
                    <select
                      id="gymClass"
                      value={gymClassId}
                      onChange={(e) => setGymClassId(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Select Class</option>
                      {classes.map((c: any) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Booking Status</Label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attendance">Attendance</Label>
                    <select
                      id="attendance"
                      value={attendanceStatus}
                      onChange={(e) => setAttendanceStatus(e.target.value as any)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="pending">Pending</option>
                      <option value="attended">Attended</option>
                      <option value="no_show">No Show</option>
                    </select>
                  </div>
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => { setIsAdding(false); resetForm(); }}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Create Booking
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
              placeholder="Search by member or class..."
            />
          </div>

          {isPending ? (
            <div className="text-center py-8 text-muted-foreground">Loading bookings...</div>
          ) : fetchError ? (
            <Alert variant="destructive">
              <AlertDescription>Failed to load bookings.</AlertDescription>
            </Alert>
          ) : filteredBookings.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-8 text-center">
              <p className="text-muted-foreground">No bookings found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Booking Status</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking: any) => {
                    const user = users.find((u: any) => u.id === booking.user_id);
                    const gymClass = classes.find((c: any) => c.id === booking.gym_class_id);
                    return (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{user ? user.name || user.email : "Unknown"}</TableCell>
                        <TableCell>{gymClass ? gymClass.name : "Unknown"}</TableCell>
                        <TableCell>
                          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={booking.attendance_status === "attended" ? "success" : booking.attendance_status === "no_show" ? "destructive" : "warning"}>
                            {booking.attendance_status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {booking.status === "confirmed" && (
                              <Button size="sm" variant="outline" onClick={() => handleCancelBooking(booking)}>
                                Cancel Booking
                              </Button>
                            )}
                            {booking.attendance_status === "pending" && (
                              <>
                                <Button size="icon" variant="ghost" className="text-success hover:text-success" onClick={() => handleUpdateAttendance(booking, "attended")}>
                                  <Check className="size-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleUpdateAttendance(booking, "no_show")}>
                                  <XCircle className="size-4" />
                                </Button>
                              </>
                            )}
                            <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(booking.id)}>
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
