import { useEffect, useState } from "react";
import ReimbursementCard from "../components/reimbursement-card";
import { Reimbursement, ReimbursementRequest } from "../types";
import { X } from "lucide-react";
import SubmitReimbursementRequest from "../components/submit-reimbursement-request";
import { useModal } from "../context/ModelContext";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { showNewReimbursementForm, setShowNewReimbursementForm } = useModal();
  const { token } = useAuth();

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
        // todo: toast
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
      const response = await fetch(
        "http://localhost:1234/reimbursements",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReimbursements([...reimbursements, data]);
      setShowNewReimbursementForm(false);
      // todo: toast
    } catch (error) {
      // todo: toast
      console.error("Error submitting reimbursement request:", error);
    }
  };

  return (
    <>
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
      {/* Reimbursements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reimbursements.map((reimbursement, index) => (
          <ReimbursementCard key={index} reimbursement={reimbursement} />
        ))}
      </div>
    </>
  );
}
