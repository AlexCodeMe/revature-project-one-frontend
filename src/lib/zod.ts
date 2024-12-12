import * as z from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .max(50, { message: "First name must be less than 50 characters" }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(50, { message: "Last name must be less than 50 characters" }),
    username: z
      .string()
      .min(1, { message: "Username is required" })
      .max(50, { message: "Username must be less than 50 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    role: z.enum(["EMPLOYEE", "MANAGER"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const reimbursementSchema = z.object({
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(255, "Please limit the description to 255 characters"),
});

export type ReimbursementSchema = z.infer<typeof reimbursementSchema>;
