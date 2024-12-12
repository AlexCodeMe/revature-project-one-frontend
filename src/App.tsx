import AdminDashboard from "./components/admin-dashboard";
import Dashboard from "./components/dashboard";
import { Layout, AuthLayout } from "./components/layout/layout";
import Login from "./components/login";
import ProtectRoute from "./components/protect-route";
import Register from "./components/register";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

            {/* Manager Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
