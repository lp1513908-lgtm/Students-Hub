import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        navigate("/login");
    };

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

                {/* LOGOUT */}
                <button
                    onClick={handleLogout}
                    className="logout-btn"
                >
                    🚪 Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;