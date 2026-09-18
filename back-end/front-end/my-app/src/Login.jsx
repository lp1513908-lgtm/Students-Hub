import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        setError("");

        if (!username.trim()) {
            setError("Please enter your username");
            return;
        }

        if (!password.trim()) {
            setError("Please enter your password");
            return;
        }

        // Temporary admin login
        if (
            username === "admin" &&
            password === "admin123"
        ) {
            // Save admin login session
            localStorage.setItem("isAdmin", "true");
            localStorage.setItem("adminUsername", username);

            navigate("/dashboard");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <Link to="/" className="login-back">
                    ← Back to Home
                </Link>

                <div className="login-icon">
                    🎓
                </div>

                <p className="login-label">
                    STUDENTS HUB
                </p>

                <h1>Admin Login</h1>

                <p className="login-subtitle">
                    Login to manage student information
                </p>

                {error && (
                    <div className="login-error">
                        ❌ {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>

                    <div className="login-group">
                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                        />
                    </div>

                    <div className="login-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                    >
                        Login
                    </button>

                </form>

                <div className="login-divider">
                    <span>OR</span>
                </div>

                <p className="register-text">
                    New student?

                    <Link to="/register">
                        Register here
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;