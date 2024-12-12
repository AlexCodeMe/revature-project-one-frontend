import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "../../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";

export default function RegisterForm() {
  const { register } = useAuth();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "EMPLOYEE",
    },
  });

  async function onSubmit(data: RegisterSchema) {
    try {
      console.log("register submitted ...", data);
      await register(data);
    } catch (error) {
      // TODO: toast
      console.error("Register failed", error);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex gap-2">
        <div className="flex-1">
          <p className="text-sm font-medium tracking-wide text-center">
            first name
          </p>
          <input
            type="text"
            {...form.register("firstName")}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium tracking-wide text-center">
            last name
          </p>
          <input
            type="text"
            {...form.register("lastName")}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium tracking-wide text-center">role</p>
        <select
          {...form.register("role")}
          className="w-full rounded-md border border-gray-300 p-2"
        >
          <option value="EMPLOYEE">Employee</option>
          <option value="MANAGER">Manager</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium tracking-wide text-center">
          username
        </p>
        <input
          type="text"
          {...form.register("username")}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium tracking-wide text-center">
          password
        </p>
        <input
          type="password"
          {...form.register("password")}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium tracking-wide text-center">
          confirm password
        </p>
        <input
          type="password"
          {...form.register("confirmPassword")}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700"
      >
        Register
      </button>
    </form>
  );
}
