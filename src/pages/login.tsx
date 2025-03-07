import { Link } from "react-router-dom";
import LoginForm from "../components/auth/login-form";

export default function Login() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold">Login to ERS</h1>
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-gray-500">Login</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        {/* Login Form */}
        <LoginForm />
        <div className="flex justify-center items-center gap-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </>
  );
}
