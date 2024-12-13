import { useEffect, useState } from "react";
import { Clock, Receipt, Users } from "lucide-react";
import { UserTable } from "../components/admin/user-table";
import { ReimbursementTable } from "../components/admin/reimbursement-table";
import { Reimbursement, User } from "../types";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "users">(
    "all"
  );
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const { token } = useAuth();

  useEffect(() => {
    const getReimbursements = async (): Promise<Reimbursement[]> => {
      const response = await fetch("http://localhost:1234/reimbursements", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch reimbursements");
      }
      return response.json();
    };

    const getUsers = async (): Promise<User[]> => {
      const response = await fetch("http://localhost:1234/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json();
    };

    const fetchReimbursements = async () => {
      const data = await Promise.all([getReimbursements(), getUsers()]);
      setReimbursements(data[0]);
      setUsers(data[1]);
    };
    fetchReimbursements();
  }, [token]);

  const handleUpdateStatus = async (
    id: number,
    status: "APPROVED" | "DENIED"
  ) => {
    console.log("Update status:", id, status);
    try {
      // TODO: Implement status update logic
      const response = await fetch(
        `http://localhost:1234/reimbursements/manager/resolve/${id}?status=${status}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        toast.error("Failed to update status");
        throw new Error("Failed to update status");
      }

      setReimbursements(
        reimbursements.map((reimbursement) =>
          reimbursement.id === id
            ? { ...reimbursement, status: status }
            : reimbursement
        )
      );

      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Error updating status");
      console.error("Error updating status", error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    console.log("Delete user:", userId);
    try {
      const response = await fetch(`http://localhost:1234/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        toast.error("Failed to delete user");
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((user) => user.id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Error deleting user");
      console.error("Error deleting user", error);
    }
  };

  const handlePromoteUser = async (userId: number) => {
    console.log("Promote user:", userId);
    try {
      const response = await fetch(
        `http://localhost:1234/users/${userId}?role=MANAGER`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        toast.error("Failed to promote user");
        throw new Error("Failed to promote user");
      }

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: "MANAGER" } : user
        )
      );

      toast.success("User promoted successfully");
    } catch (error) {
      toast.error("Error promoting user");
      console.error("Error promoting user", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("all")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "all"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Receipt className="h-5 w-5 inline-block mr-2" />
                All Reimbursements
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "pending"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Clock className="h-5 w-5 inline-block mr-2" />
                Pending Requests
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "users"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Users className="h-5 w-5 inline-block mr-2" />
                Manage Users
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "users" ? (
              <UserTable
                users={users}
                onDeleteUser={handleDeleteUser}
                onPromoteUser={handlePromoteUser}
              />
            ) : (
              <ReimbursementTable
                reimbursements={reimbursements}
                onUpdateStatus={handleUpdateStatus}
                filter={activeTab === "pending" ? "PENDING" : "ALL"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
