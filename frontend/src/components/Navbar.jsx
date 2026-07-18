import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
    return (
        <nav className="navbar">

            <NavLink to="/" className="logo">
                <img
                    src={logo}
                    alt="Morphix"
                    className="logo-image"
                />
            </NavLink>

            <div className="nav-links">

                <NavLink to="/">
                    Home
                </NavLink>

                <NavLink to="/developer-tools">
                    Developer Tools
                </NavLink>

                <NavLink to="/image-tools">
                    Image Tools
                </NavLink>

            </div>

        </nav>
    );
}

export default Navbar;