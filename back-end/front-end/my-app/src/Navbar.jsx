import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

            {/* LOGO */}
            <NavLink to="/" className="navbar-logo">
                🎓 Students Hub
            </NavLink>

            {/* NAVIGATION LINKS */}
            <div className="navbar-links">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    🏠 Home
                </NavLink>

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    📊 Dashboard
                </NavLink>

                <NavLink
                    to="/students"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    👨‍🎓 Students
                </NavLink>

            </div>

        </nav>
    );
}

export default Navbar;