import { useState } from "react";
import { Link } from "react-router-dom";
import "./DeleteStudent.css";

function DeleteStudent() {
    const [id, setId] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const showMessage = (text) => {
        setMessage(text);

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    const showError = (text) => {
        setError(text);

        setTimeout(() => {
            setError("");
        }, 3000);
    };

    const deleteStudent = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!id.trim()) {
            showError("Please enter student ID");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `https://students-hub-3.onrender.com/users/${id.trim()}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (response.ok) {
                showMessage("Student deleted successfully!");
                setId("");
            } else {
                showError(data.message || "Delete failed");
            }

        } catch (error) {
            console.log(error);
            showError("Unable to connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="delete-page">

            {/* SUCCESS TOAST */}
            {message && (
                <div className="toast success-toast">
                    ✅ {message}
                </div>
            )}

            {/* ERROR TOAST */}
            {error && (
                <div className="toast error-toast">
                    ❌ {error}
                </div>
            )}

            <div className="delete-card">

                <Link to="/" className="back-link">
                    ← Back to Students
                </Link>

                <div className="delete-icon">
                    🗑️
                </div>

                <h1>
                    Delete Student
                </h1>

                <p className="subtitle">
                    Remove a student from Students Hub
                </p>

                <form onSubmit={deleteStudent}>

                    <div className="delete-group">

                        <label>
                            Student ID
                        </label>

                        <input
                            type="text"
                            placeholder="Enter student ID"
                            value={id}
                            onChange={(e) =>
                                setId(e.target.value)
                            }
                        />

                    </div>

                    <button
                        type="submit"
                        className="delete-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Deleting Student..."
                            : "Delete Student"}
                    </button>

                </form>

                <p className="delete-warning">
                    ⚠️ This action cannot be undone.
                </p>

            </div>

        </div>
    );
}

export default DeleteStudent;