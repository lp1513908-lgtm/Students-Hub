import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [course, setCourse] = useState("");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (!name.trim()) {
            setError("Please enter your name");
            return;
        }

        if (!username.trim()) {
            setError("Please enter a username");
            return;
        }

        if (!password.trim()) {
            setError("Please enter a password");
            return;
        }

        if (!course) {
            setError("Please select a course");
            return;
        }

        // Temporary registration test
        setMessage("Registration successful!");

        setTimeout(() => {
            navigate("/");
        }, 1500);
    };

    return (
        <div className="register-page">

            <div className="register-card">

                <Link to="/" className="register-back">
                    ← Back to Home
                </Link>

                <div className="register-icon">
                    🎓
                </div>

                <p className="register-label">
                    STUDENTS HUB
                </p>

                <h1>Student Registration</h1>

                <p className="register-subtitle">
                    Register to explore available courses
                </p>

                {message && (
                    <div className="register-success">
                        ✅ {message}
                    </div>
                )}

                {error && (
                    <div className="register-error">
                        ❌ {error}
                    </div>
                )}

                <form onSubmit={handleRegister}>

                    <div className="register-group">
                        <label>Student Name</label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="register-group">
                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Create a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="register-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="register-group">
                        <label>Course</label>

                        <select
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                        >
                            <option value="">
                                Select Course
                            </option>

                            <option value="Python">
                                Python
                            </option>

                            <option value="Java">
                                Java
                            </option>

                            <option value="MERN Stack">
                                MERN Stack
                            </option>

                            <option value="AWS">
                                AWS
                            </option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="register-btn"
                    >
                        Register
                    </button>

                </form>

                <div className="register-divider">
                    <span>OR</span>
                </div>

                <p className="login-text">
                    Already have an account?

                    <Link to="/login">
                        Admin Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;