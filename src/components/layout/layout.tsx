import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

export function Layout() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div>
      {/** authenticated user header */}
      {/** unauthenticated user header */}
      <Navbar authenticated={isAuthenticated} onLogout={handleLogout} user={user} />
      <main>
        <Outlet />
      </main>

      {/** authenticated user footer */}
      {/** unauthenticated user footer */}
      <Footer />
    </div>
  );
}

export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
