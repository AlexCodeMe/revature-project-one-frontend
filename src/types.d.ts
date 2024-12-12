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
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
