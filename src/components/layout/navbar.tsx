import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <nav>
        <div>
          <Link to="/">Home</Link>
        </div>
      </nav>
    </header>
  );
}
