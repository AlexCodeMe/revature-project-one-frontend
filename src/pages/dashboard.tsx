import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

import SubmitReimbursementRequest from "../components/submit-reimbursement-request";
import { Reimbursement, ReimbursementRequest } from "../lib/types";
import ReimbursementCard from "../components/reimbursement-card";
import { useModal } from "../context/ModelContext";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { showNewReimbursementForm, setShowNewReimbursementForm } = useModal();
  const { token, user } = useAuth();

  const [onlyPending, setOnlyPending] = useState(false);
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);

  useEffect(() => {
    console.log({ token });
    const fetchUserReimbursements = async () => {
      try {
        const response = await fetch(
          "http://localhost:1234/reimbursements/user/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReimbursements(data);
      } catch (error) {
        toast.error("Error fetching user reimbursements");
        console.error("Error fetching user reimbursements:", error);
      }
    };
    fetchUserReimbursements();
  }, [token]);

  const handleReimbursementRequest = async (data: {
    amount: number;
    description: string;
  }) => {
    const request: ReimbursementRequest = {
      amount: data.amount,
      description: data.description,
      status: "PENDING",
    };
    try {
      const response = await fetch("http://localhost:1234/reimbursements", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReimbursements([...reimbursements, data]);
      setShowNewReimbursementForm(false);
      toast.success("Reimbursement request submitted successfully");
    } catch (error) {
      toast.error("Error submitting reimbursement request");
      console.error("Error submitting reimbursement request:", error);
    }
  };

  return (
    <div className="w-full mx-auto md:w-[768px] lg:w-[1024px]">
      {showNewReimbursementForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">New Reimbursement</h2>
              <button
                onClick={() => setShowNewReimbursementForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <SubmitReimbursementRequest onSubmit={handleReimbursementRequest} />
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="flex items-center justify-between gap-x-6">
        <button
          onClick={() => setShowNewReimbursementForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Reimbursement
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {user?.firstName}&apos;s Reimbursements
        </h1>
        <button
          onClick={() => setOnlyPending(!onlyPending)}
          className={`
      px-4 py-2 rounded-lg font-medium transition-colors
      ${
        onlyPending
          ? "text-sky-500 hover:text-sky-600 border border-sky-500 bg-sky-100"
          : "text-emerald-500 hover:text-emerald-600 border border-emerald-500 bg-emerald-100"
      }
    `}
        >
          {onlyPending ? "Show All" : "Show Pending"}
        </button>
      </div>

      {/* Reimbursements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {reimbursements.map((reimbursement, index) => (
          <ReimbursementCard
            key={index}
            reimbursement={reimbursement}
            onlyPending={onlyPending}
          />
        ))}
      </div>
    </div>
  );
}
