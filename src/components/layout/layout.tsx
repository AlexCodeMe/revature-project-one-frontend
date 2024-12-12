import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

export function Layout() {
  return (
    <div>
      {/** authenticated user header */}
      {/** unauthenticated user header */}
      <Navbar />
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
      <div className="flex h-full max-h-[50rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="w-full md:w-1/2 flex flex-col justify-center p-10">
          <div className="space-y-6">
            <Outlet />
          </div>
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
