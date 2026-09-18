import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./StudentDetails.css";

function StudentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

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

    // Get student details
    useEffect(() => {
        setLoading(true);
        setError("");

        fetch(`http://localhost:3000/users/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Student not found");
                }

                return res.json();
            })
            .then((data) => {
                setStudent(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError("Unable to load student details.");
                setLoading(false);
            });
    }, [id]);

    // Delete student
    const deleteStudent = async () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${student.name}?`
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `http://localhost:3000/users/${student._id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (response.ok) {
                showMessage("Student deleted successfully!");

                setTimeout(() => {
                    navigate("/");
                }, 1200);
            } else {
                showError(data.message || "Delete failed");
            }
        } catch (error) {
            console.log(error);
            showError("Unable to connect to server");
        }
    };

    // Loading
    if (loading) {
        return (
            <div className="details-page">

                <div className="details-message">

                    <div className="loader"></div>

                    <h2>
                        Loading Student...
                    </h2>

                    <p>
                        Fetching student information.
                    </p>

                </div>

            </div>
        );
    }

    // Error
    if (error && !student) {
        return (
            <div className="details-page">

                <div className="details-message">

                    <div className="details-error-icon">
                        ❌
                    </div>

                    <h2>
                        Student Not Found
                    </h2>

                    <p>
                        Unable to find the requested student.
                    </p>

                    <Link
                        to="/"
                        className="details-home-btn"
                    >
                        ← Back to Students
                    </Link>

                </div>

            </div>
        );
    }

    return (
        <div className="details-page">

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

            <div className="details-card">

                {/* BACK */}
                <Link
                    to="/"
                    className="back-link"
                >
                    ← Back to Students
                </Link>


                {/* AVATAR */}
                <div className="details-avatar">

                    {student.name
                        ?.charAt(0)
                        .toUpperCase()}

                </div>


                <p className="details-label">
                    STUDENT PROFILE
                </p>


                <h1>
                    {student.name}
                </h1>


                <p className="details-subtitle">
                    Student information and academic details
                </p>


                {/* DETAILS */}
                <div className="details-info">

                    <div className="detail-item">

                        <span>
                            🎓
                        </span>

                        <div>
                            <small>
                                Course
                            </small>

                            <strong>
                                {student.course ||
                                    "Course not added"}
                            </strong>
                        </div>

                    </div>


                    <div className="detail-item">

                        <span>
                            🎂
                        </span>

                        <div>
                            <small>
                                Age
                            </small>

                            <strong>
                                {student.age}
                            </strong>
                        </div>

                    </div>


                    <div className="detail-item">

                        <span>
                            🆔
                        </span>

                        <div>
                            <small>
                                Student ID
                            </small>

                            <strong className="student-id">
                                {student._id}
                            </strong>
                        </div>

                    </div>

                </div>


                {/* BUTTONS */}
                <div className="details-buttons">

                    <Link
                        to={`/update?id=${student._id}`}
                        className="edit-btn"
                    >
                        ✏️ Edit Student
                    </Link>


                    <button
                        className="delete-btn"
                        onClick={deleteStudent}
                    >
                        🗑️ Delete Student
                    </button>

                </div>

            </div>

        </div>
    );
}

export default StudentDetails;