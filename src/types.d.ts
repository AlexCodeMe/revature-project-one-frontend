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
