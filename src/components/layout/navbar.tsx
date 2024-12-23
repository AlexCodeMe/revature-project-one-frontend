import { Receipt } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserMenu } from "../user-menu";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <header className="bg-zinc-50 shadow-xl h-16 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center gap-x-8">
          <div
            className="flex items-center hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Receipt className="h-8 w-8 text-blue-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">ERS</h1>
          </div>
          <div className="flex items-center gap-x-4">
            {user?.role === "MANAGER" && !isAdminPage && (
              <Link
                to="/admin"
                className="px-4 py-2 border bg-rose-400 rounded-lg"
              >
                Admin Dashboard
              </Link>
            )}
            <UserMenu user={user} onLogout={logout} />
          </div>
        </div>
      </div>
    </header>
  );
}
