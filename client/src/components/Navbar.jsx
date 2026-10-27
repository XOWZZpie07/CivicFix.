
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        CivicFix
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/report">Report Issue</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup" className="signup-link">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
