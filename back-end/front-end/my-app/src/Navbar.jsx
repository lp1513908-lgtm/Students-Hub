import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

            <NavLink to="/" className="navbar-logo">
                🎓 Students Hub
            </NavLink>

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
                    to="/insert"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    ➕ Add Student
                </NavLink>

                <NavLink
                    to="/update"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    ✏️ Update
                </NavLink>

                <NavLink
                    to="/delete"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    🗑️ Delete
                </NavLink>

            </div>

        </nav>
    );
}

export default Navbar;