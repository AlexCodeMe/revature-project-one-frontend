import { User } from "../../types";

interface NavbarProps {
  authenticated: boolean;
  onLogout: () => void;
  user: User | null;
}

export default function Navbar({ authenticated, onLogout, user }: NavbarProps) {
  return authenticated ? (
    <div>Authenticated Navbar</div>
  ) : (
    <div>Unauthenticated Navbar</div>
  );
}
