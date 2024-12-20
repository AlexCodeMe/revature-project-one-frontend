import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { ModalProvider } from "../../context/ModelContext";

export function Layout() {
  return (
    <ModalProvider>
      <div className="min-h-screen flex flex-col bg-zinc-200">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ModalProvider>
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
