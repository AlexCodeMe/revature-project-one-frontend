import { CheckCircle, Clock, DollarSign, XCircle } from "lucide-react";
import { Reimbursement } from "../types";
import { useNavigate } from "react-router-dom";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  DENIED: "bg-red-100 text-red-800",
};

interface ReimbursementCardProps {
  reimbursement: Reimbursement;
}

export default function ReimbursementCard({
  reimbursement,
}: ReimbursementCardProps) {
  const StatusIcon = {
    PENDING: Clock,
    APPROVED: CheckCircle,
    DENIED: XCircle,
  }[reimbursement.status];

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${reimbursement.id}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
  let row = "row";
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-gray-600" />
          <span className="text-xl font-semibold">
            ${reimbursement.amount.toFixed(2)}
          </span>
        </div>
        <div
          className={`px-3 py-1 rounded-full flex items-center space-x-1 ${
            statusColors[reimbursement.status]
          }`}
        >
          <StatusIcon className="w-4 h-4" />
          <span className="text-sm font-medium">{reimbursement.status}</span>
        </div>
      </div>

      <p className="text-gray-600 mb-4">{reimbursement.description}</p>

      {/* <div className="flex items-center text-sm text-gray-500">
        <Calendar className="w-4 h-4 mr-2" />
        <span>
          Submitted:{" "}
          {new Date(reimbursement.submittedDate).toLocaleDateString()}
        </span>
      </div>

      {reimbursement.resolvedDate && (
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Clock className="w-4 h-4 mr-2" />
          <span>
            Resolved:{" "}
            {new Date(reimbursement.resolvedDate).toLocaleDateString()}
          </span>
        </div>
      )} */}
    </div>
  );
}
