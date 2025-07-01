"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserTable } from "@/components/UserTable";
import { UserFormDialog } from "@/components/UserFormDialog";
import { toast } from "sonner";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = (id: string) => {
    toast("Are you sure?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const res = await fetch(`/api/users/${id}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
              toast.success("User deleted.");
              fetchUsers();
            } else {
              const err = await res.text();
              toast.error("Failed: " + err);
            }
          } catch (err) {
            toast.error("Error deleting user.");
            console.error(err);
          }
        },
      },
    });
  };

  const openAddDialog = () => {
    setCurrentUser(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (user: User) => {
    setCurrentUser(user);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">User Management</CardTitle>
          <Button onClick={openAddDialog}>Add New User</Button>
        </CardHeader>
        <CardContent>
          <UserTable
            users={users}
            onEdit={openEditDialog}
            onDelete={handleDeleteUser}
          />
        </CardContent>
      </Card>

      <UserFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        currentUser={currentUser}
        fetchUsers={fetchUsers}
      />
    </div>
  );
}
