import { Check, X } from "lucide-react";
import { Reimbursement } from "../../lib/types";
import { useState } from "react";

interface ReimbursementTableProps {
  reimbursements: Reimbursement[];
  onUpdateStatus: (id: number, status: "APPROVED" | "DENIED") => void;
  filter?: "ALL" | "PENDING";
}

type ConfirmAction = {
  reimbursementId: number;
  type: "approve" | "deny";
} | null;

export function ReimbursementTable({
  reimbursements,
  onUpdateStatus,
  filter = "ALL",
}: ReimbursementTableProps) {
  const [confirm, setConfirm] = useState<ConfirmAction>(null);

  // todo: empty state
  if (!reimbursements || reimbursements.length === 0) return null;

  const handleAction = (reimbursementId: number, type: "approve" | "deny") => {
    if (type === "approve") {
      onUpdateStatus(reimbursementId, "APPROVED");
    } else {
      onUpdateStatus(reimbursementId, "DENIED");
    }
    setConfirm(null);
  };

  const filteredReimbursements =
    filter === "PENDING"
      ? reimbursements.filter((r) => r.status === "PENDING")
      : reimbursements;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredReimbursements.map((reimbursement) => (
            <tr key={reimbursement.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {reimbursement.user.firstName} {reimbursement.user.lastName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  ${reimbursement.amount.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500 max-w-xs truncate">
                  {reimbursement.description}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    reimbursement.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : reimbursement.status === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {reimbursement.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {reimbursement.status === "PENDING" && (
                  <div className="flex justify-end space-x-2">
                    {confirm?.reimbursementId === reimbursement.id ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleAction(reimbursement.id, confirm.type)
                          }
                          className="text-red-600 hover:text-red-900 text-xs font-semibold"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setConfirm(null)}
                          className="text-gray-600 hover:text-gray-900 text-xs font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            setConfirm({
                              reimbursementId: reimbursement.id,
                              type: "approve",
                            })
                          }
                          className="text-green-600 hover:text-green-900"
                          title="Approve"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() =>
                            setConfirm({
                              reimbursementId: reimbursement.id,
                              type: "deny",
                            })
                          }
                          className="text-red-600 hover:text-red-900"
                          title="Deny"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
