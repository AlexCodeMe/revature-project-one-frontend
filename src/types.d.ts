export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: "EMPLOYEE" | "MANAGER";
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface AuthContextType extends AuthState {
  login: (values: LoginSchema) => Promise<void>;
  register: (values: RegisterSchema) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export type ReimbursementStatus = "PENDING" | "APPROVED" | "DENIED";

export interface ReimbursementRequest {
  amount: number;
  description: string;
  status: ReimbursementStatus;
}

export interface Reimbursement {
  id: number;
  amount: number;
  description: string;
  status: ReimbursementStatus;

  user: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
  };
  manager?: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
  };
}
