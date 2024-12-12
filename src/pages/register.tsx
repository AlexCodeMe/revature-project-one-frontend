import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/register-form";

export default function Register() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold">Register for ERS</h1>
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-gray-500">Registration</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        {/* Register Form */}
        <RegisterForm />
        <div className="flex justify-center items-center gap-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
