import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Morphix</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/developer-tools">Developer Tools</Link>
        <Link to="/image-tools">Image Tools</Link>
      </div>
    </nav>
  );
}

export default Navbar;