import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Reimbursement, ReimbursementStatus } from "../lib/types";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export default function ReimbursementDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const [reimbursement, setReimbursement] = useState<Reimbursement | null>(
    null
  );

  useEffect(() => {
    const fetchReimbursement = async () => {
      try {
        const response = await fetch(
          `http://localhost:1234/reimbursements/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch reimbursement");
        const data = await response.json();
        setReimbursement(data);
        setDescription(data.description);
      } catch (error) {
        console.error("Error fetching reimbursement:", error);
      }
    };

    fetchReimbursement();
  }, [id, token]);

  const [description, setDescription] = useState(reimbursement?.description);

  if (!reimbursement) return <div>Loading...</div>;


  const handleUpdateDescription = async () => {
    console.log("update description");
    try {
      const response = await fetch(
        `http://localhost:1234/reimbursements/user/update/${reimbursement.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: description,
        }
      );

      if (!response.ok) throw new Error("Failed to update description");
      const updatedReimbursement = await response.json();
      setReimbursement(updatedReimbursement);
      toast.success("Reimbursement description updated");
    } catch (error) {
      console.error("Error updating description:", error);
      toast.error("Error updating description");
    }
  };

  const getStatusClasses = (status: ReimbursementStatus) => {
    const baseClasses =
      "w-fit px-4 py-3 rounded-full flex items-center space-x-1";
    const statusClasses = {
      PENDING: "bg-neutral-100 text-neutral-800",
      APPROVED: "bg-green-100 text-green-800",
      DENIED: "bg-red-100 text-red-800",
    }[status];

    return `${baseClasses} ${statusClasses}`;
  };

  return (
    <div className="max-w-6xl mx-auto bg-yellow-50 rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">Reimbursement Details</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-gray-500">Amount</h2>
          <p className="text-xl font-semibold">
            ${reimbursement.amount.toFixed(2)}
          </p>
        </div>
        <div>
          <h2 className="text-gray-500">Status</h2>
          <div className={getStatusClasses(reimbursement.status)}>
            <span className="text-sm font-medium">{reimbursement.status}</span>
          </div>
        </div>
        <div>
          <h2 className="text-gray-500">Description</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-none rounded-lg p-1.5 w-full"
            rows={description?.split("\n").length || 1}
          />
        </div>
      </div>

      <div className="flex justify-end gap-x-6 pt-6">
        <button
          onClick={handleUpdateDescription}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Update Description
        </button>
      </div>
    </div>
  );
}
