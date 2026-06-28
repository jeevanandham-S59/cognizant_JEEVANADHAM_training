import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        background: "#1e3a8a",
      }}
    >
      <Link to="/" style={{ color: "white" }}>
        Home
      </Link>

      <Link to="/courses" style={{ color: "white" }}>
        Courses
      </Link>

      <Link to="/profile" style={{ color: "white" }}>
        Profile
      </Link>
    </nav>
  );
}

export default Navbar;