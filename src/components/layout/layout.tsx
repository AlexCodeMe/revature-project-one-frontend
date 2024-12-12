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
      <Navbar
        authenticated={isAuthenticated}
        onLogout={handleLogout}
        user={user}
      />
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
    <main className="flex h-screen items-center justify-center p-5 bg-gray-50">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <Outlet />
        </div>
        <div
          className="hidden w-1/2 bg-cover bg-center md:block"
          style={{
            backgroundImage: "url(src/assets/auth-background.jpg)",
          }}
        />
      </div>
    </main>
  );
}
