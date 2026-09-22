import { useState } from "react";
import { Link } from "react-router-dom";
import "./AddStudent.css";

function AddStudent() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [course, setCourse] = useState("");

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

    const addStudent = async (e) => {
        e.preventDefault();

        // Clear old messages
        setMessage("");
        setError("");

        // Name validation
        if (name.trim().length < 3) {
            showError("Name must contain at least 3 characters");
            return;
        }

        // Age validation
        const studentAge = Number(age);

        if (!age || studentAge < 15 || studentAge > 100) {
            showError("Please enter a valid age between 15 and 100");
            return;
        }

        // Course validation
        if (!course) {
            showError("Please select a course");
            return;
        }

        const student = {
            name: name.trim(),
            age: studentAge,
            course: course
        };

        try {
            setLoading(true);

            const response = await fetch(
                "https://students-hub-3.onrender.com",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(student)
                }
            );

            const data = await response.json();

            if (response.ok) {
                showMessage("Student added successfully!");

                // Clear form
                setName("");
                setAge("");
                setCourse("");
            } else {
                showError(data.message || "Failed to add student");
            }

        } catch (error) {
            console.log(error);
            showError("Unable to connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-page">

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

            <div className="add-card">

                {/* BACK */}
                <Link to="/" className="back-link">
                    ← Back to Students
                </Link>

                <h1>
                    Add Student
                </h1>

                <p className="subtitle">
                    Add a new student to Students Hub
                </p>

                <form onSubmit={addStudent}>

                    {/* NAME */}
                    <div className="input-group">

                        <label>
                            Student Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter student name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                    </div>


                    {/* AGE */}
                    <div className="input-group">

                        <label>
                            Age
                        </label>

                        <input
                            type="number"
                            placeholder="Enter age"
                            value={age}
                            onChange={(e) =>
                                setAge(e.target.value)
                            }
                        />

                    </div>


                    {/* COURSE */}
                    <div className="input-group">

                        <label>
                            Course
                        </label>

                        <select
                            value={course}
                            onChange={(e) =>
                                setCourse(e.target.value)
                            }
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


                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="add-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Adding Student..."
                            : "Add Student"}

                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddStudent;