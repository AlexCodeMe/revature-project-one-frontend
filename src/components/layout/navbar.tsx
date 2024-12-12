import { Plus, Receipt } from "lucide-react";
import { useModal } from "../../context/ModelContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { setShowNewReimbursementForm } = useModal();
  const navigate = useNavigate();

  return (
    <header className="bg-zinc-50 shadow-xl h-16 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-start items-center gap-x-8">
          <div className="flex items-center hover:cursor-pointer" onClick={() => navigate("/")}>
            <Receipt className="h-8 w-8 text-blue-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">ERS</h1>
          </div>
          <button
            onClick={() => setShowNewReimbursementForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Reimbursement
          </button>
        </div>
      </div>
      <div>
        {/** user info dropdown
         * - name
         * - role
         * - avatar
         * - logout button
         */}
      </div>
    </header>
  );
}
