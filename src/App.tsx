import AdminDashboard from "./pages/admin-dashboard";
import Dashboard from "./pages/dashboard";
import { Layout, AuthLayout } from "./components/layout/layout";
import Login from "./pages/login";
import ProtectRoute from "./pages/protect-route";
import Register from "./pages/register";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReimbursementDetails from "./pages/reimbursement-details";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Routes */}
          <Route
            element={
              <ProtectRoute>
                <Layout />
              </ProtectRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/:id" element={<ReimbursementDetails />} />
            {/* Manager Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/:id" element={<ReimbursementDetails />} />
          </Route>
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
