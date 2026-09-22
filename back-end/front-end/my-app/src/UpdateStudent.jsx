import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./UpdateStudent.css";

function UpdateStudent() {

    const [searchParams] = useSearchParams();

    const urlStudentId = searchParams.get("id");

    const [studentId, setStudentId] = useState(
        urlStudentId || ""
    );

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [course, setCourse] = useState("");

    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);

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


    // Load student details
    const loadStudent = async () => {

        if (!studentId.trim()) {
            showError("Please enter student ID");
            return;
        }

        try {

            setLoading(true);

            setMessage("");
            setError("");

            const response = await fetch(
                `https://students-hub-3.onrender.com/users/${studentId.trim()}`
            );

            const data = await response.json();

            if (!response.ok) {
                showError(
                    data.message || "Student not found"
                );
                return;
            }

            setName(data.name || "");
            setAge(data.age || "");
            setCourse(data.course || "");

            showMessage("Student details loaded successfully!");

        } catch (error) {

            console.log(error);

            showError(
                "Unable to connect to server"
            );

        } finally {

            setLoading(false);
        }
    };


    // Automatically load when coming from Edit button
    useEffect(() => {

        if (urlStudentId) {

            setStudentId(urlStudentId);

            const loadFromUrl = async () => {

                try {

                    setLoading(true);

                    const response = await fetch(
                        `https://students-hub-3.onrender.com/users/${urlStudentId}`
                    );

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error("Student not found");
                    }

                    setName(data.name || "");
                    setAge(data.age || "");
                    setCourse(data.course || "");

                } catch (error) {

                    console.log(error);

                    setError(
                        "Unable to load student details."
                    );

                } finally {

                    setLoading(false);
                }
            };

            loadFromUrl();
        }

    }, [urlStudentId]);


    // Update student
    const updateStudent = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");


        if (!studentId.trim()) {

            showError(
                "Please enter student ID first"
            );

            return;
        }


        if (name.trim().length < 3) {

            showError(
                "Name must contain at least 3 characters"
            );

            return;
        }


        const studentAge = Number(age);

        if (
            !age ||
            studentAge < 15 ||
            studentAge > 100
        ) {

            showError(
                "Age must be between 15 and 100"
            );

            return;
        }


        if (!course.trim()) {

            showError(
                "Please select a course"
            );

            return;
        }


        try {

            setUpdating(true);

            const response = await fetch(
                `https://students-hub-3.onrender.com/users/${studentId.trim()}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name.trim(),
                        age: studentAge,
                        course: course.trim()
                    })
                }
            );


            const data = await response.json();


            if (response.ok) {

                showMessage(
                    "Student updated successfully!"
                );

            } else {

                showError(
                    data.message || "Update failed"
                );
            }

        } catch (error) {

            console.log(error);

            showError(
                "Unable to connect to server"
            );

        } finally {

            setUpdating(false);
        }
    };


    return (
        <div className="update-page">

            {/* Toast Messages */}

            {message && (
                <div className="toast success-toast">
                    ✅ {message}
                </div>
            )}

            {error && (
                <div className="toast error-toast">
                    ❌ {error}
                </div>
            )}


            <div className="update-card">

                <Link
                    to="/"
                    className="home-link"
                >
                    ← Back to Students
                </Link>


                <div className="update-icon">
                    ✏️
                </div>


                <p className="update-label">
                    STUDENTS HUB
                </p>


                <h1>
                    Update Student
                </h1>


                <p className="subtitle">
                    Search a student and update their
                    information
                </p>


                {/* Student ID Search */}

                <div className="student-id-section">

                    <label>
                        Student ID
                    </label>

                    <div className="student-id-row">

                        <input
                            type="text"
                            placeholder="Enter student ID"
                            value={studentId}
                            onChange={(e) =>
                                setStudentId(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            type="button"
                            className="load-btn"
                            onClick={loadStudent}
                            disabled={loading}
                        >
                            {loading
                                ? "Loading..."
                                : "Load"}
                        </button>

                    </div>

                    <p className="helper-text">
                        Enter the student ID to load
                        existing details.
                    </p>

                </div>


                {/* Update Form */}

                <form onSubmit={updateStudent}>

                    <div className="update-group">

                        <label>
                            Student Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter student name"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    <div className="update-group">

                        <label>
                            Age
                        </label>

                        <input
                            type="number"
                            placeholder="Enter age"
                            value={age}
                            onChange={(e) =>
                                setAge(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    <div className="update-group">

                        <label>
                            Course
                        </label>

                        <select
                            value={course}
                            onChange={(e) =>
                                setCourse(
                                    e.target.value
                                )
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


                    <button
                        type="submit"
                        className="update-btn"
                        disabled={updating}
                    >

                        {updating
                            ? "Updating Student..."
                            : "Update Student"}

                    </button>

                </form>

            </div>

        </div>
    );
}

export default UpdateStudent;