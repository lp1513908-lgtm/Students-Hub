import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Students.css";
import PythonImg from "./Images/python.png";
import JavaImg from "./Images/java.png";
import MernImg from "./Images/mern.png";
import AwsImg from "./Images/aws.png";

function Students() {
    const [std, setstd] = useState([]);
    const [search, setSearch] = useState("");
    const [filterCourse, setFilterCourse] = useState("All");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // ================================
    // FETCH STUDENTS
    // ================================

    const fetchStudents = () => {
        setLoading(true);
        setError("");

        fetch("https://students-hub-3.onrender.comusers")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to load students");
                }

                return res.json();
            })
            .then((data) => {
                setstd(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError("Unable to load student data.");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // ================================
    // COUNT COURSES
    // ================================

    const courses = [
        ...new Set(
            std
                .map((student) => student.course)
                .filter(Boolean)
                .map((course) => course.toLowerCase())
        )
    ];

    // ================================
    // STATISTICS
    // ================================

    const totalStudents = std.length;
    const totalCourses = courses.length;

    const averageAge =
        std.length > 0
            ? Math.round(
                  std.reduce(
                      (total, student) =>
                          total + Number(student.age || 0),
                      0
                  ) / std.length
              )
            : 0;

    // ================================
    // SEARCH + FILTER
    // ================================

    const filteredStudents = std.filter((student) => {
        const matchesSearch = student.name
            ?.toLowerCase()
            .includes(search.toLowerCase());

        const matchesCourse =
            filterCourse === "All" ||
            student.course?.toLowerCase() ===
                filterCourse.toLowerCase();

        return matchesSearch && matchesCourse;
    });

    // ================================
    // DELETE STUDENT
    // ================================

    const handleDelete = async (student) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${student.name}?`
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `https://students-hub-3.onrender.com/users/${student._id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (response.ok) {
                setstd((currentStudents) =>
                    currentStudents.filter(
                        (item) => item._id !== student._id
                    )
                );

                setMessage("Student deleted successfully!");

                setTimeout(() => {
                    setMessage("");
                }, 3000);
            } else {
                setError(
                    data.message || "Delete failed"
                );

                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        } catch (error) {
            console.log(error);

            setError("Unable to delete student.");

            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    // ================================
    // PAGE
    // ================================

    return (
        <div className="home-page">

            {/* NAVBAR */}

            <Navbar />

            {/* SUCCESS MESSAGE */}

            {message && (
                <div className="toast success-toast">
                    ✅ {message}
                </div>
            )}

            {/* ERROR MESSAGE */}

            {error && (
                <div className="toast error-toast">
                    ❌ {error}
                </div>
            )}

            {/* ================================
                HERO
            ================================= */}

            <section className="hero">

                <p className="welcome">
                    WELCOME TO
                </p>

                <h1>
                    Students Hub
                </h1>

                <p>
                    A simple and powerful platform to manage
                    student information, courses and academic
                    details.
                </p>

            </section>

            {/* ================================
                STATISTICS
            ================================= */}

            <section className="stats">

                <div className="stat-card">

                    <span>👨‍🎓</span>

                    <h2>
                        {loading ? "..." : totalStudents}
                    </h2>

                    <p>
                        Total Students
                    </p>

                </div>

                <div className="stat-card">

                    <span>📚</span>

                    <h2>
                        {loading ? "..." : totalCourses}
                    </h2>

                    <p>
                        Courses
                    </p>

                </div>

                <div className="stat-card">

                    <span>📊</span>

                    <h2>
                        {loading ? "..." : averageAge}
                    </h2>

                    <p>
                        Average Age
                    </p>

                </div>

            </section>

            {/* ================================
                COURSES
            ================================= */}

            <section className="course-section">

                <h2>
                    Explore Courses
                </h2>

                <p className="section-text">
                    Select a course to view enrolled students.
                </p>

                <div className="courses">

                    {/* PYTHON */}

                    <Link
                        to="/course/python"
                        className="course-link"
                    >
                        <div className="course-card">

                            <div className="course-icon">
                                🐍
                            </div>

                            <h2>
                                Python
                            </h2>

                            <p>
                                Learn Python programming and build
                                your coding skills.
                            </p>

                            <span>
                                View Students →
                            </span>

                        </div>
                    </Link>

                    {/* JAVA */}

                    <Link
                        to="/course/java"
                        className="course-link"
                    >
                        <div className="course-card">

                            <div className="course-icon">
                                ☕
                            </div>

                            <h2>
                                Java
                            </h2>

                            <p>
                                Learn Java programming and
                                object-oriented concepts.
                            </p>

                            <span>
                                View Students →
                            </span>

                        </div>
                    </Link>

                    {/* MERN */}

                    <Link
                        to="/course/mern"
                        className="course-link"
                    >
                        <div className="course-card">

                            <div className="course-icon">
                                🌐
                            </div>

                            <h2>
                                MERN Stack
                            </h2>

                            <p>
                                Build modern full-stack web
                                applications.
                            </p>

                            <span>
                                View Students →
                            </span>

                        </div>
                    </Link>

                    {/* AWS */}

                    <Link
                        to="/course/aws"
                        className="course-link"
                    >
                        <div className="course-card">

                            <div className="course-icon">
                                ☁️
                            </div>

                            <h2>
                                AWS
                            </h2>

                            <p>
                                Learn cloud computing and build
                                scalable cloud applications.
                            </p>

                            <span>
                                View Students →
                            </span>

                        </div>
                    </Link>

                </div>

            </section>

            {/* ================================
                SEARCH + FILTER
            ================================= */}

            <div className="search-filter">

                <input
                    type="text"
                    placeholder="🔍 Search student..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <select
                    value={filterCourse}
                    onChange={(e) =>
                        setFilterCourse(e.target.value)
                    }
                >
                    <option value="All">
                        All Courses
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

            {/* ================================
                STUDENTS
            ================================= */}

            <section className="student-section">

                <div className="section-heading">

                    <div>

                        <h2>
                            All Students
                        </h2>

                        <p>
                            Recently registered students
                        </p>

                    </div>

                </div>

                <div className="student-grid">

                    {/* LOADING */}

                    {loading ? (

                        <div className="loading-box">

                            <div className="loader"></div>

                            <h3>
                                Loading Students...
                            </h3>

                            <p>
                                Please wait while we fetch the data.
                            </p>

                        </div>

                    ) : error ? (

                        /* ERROR */

                        <div className="error-box">

                            <h3>
                                ❌ Something went wrong
                            </h3>

                            <p>
                                Unable to load student information.
                            </p>

                            <button
                                className="retry-btn"
                                onClick={fetchStudents}
                            >
                                🔄 Try Again
                            </button>

                        </div>

                    ) : filteredStudents.length === 0 ? (

                        /* NO STUDENTS */

                        <div className="empty-box">

                            <h3>
                                🔍 No Students Found
                            </h3>

                            <p>
                                Try another name or course.
                            </p>

                        </div>

                    ) : (

                        /* STUDENT CARDS */

                        filteredStudents.map((student) => (

                            <div
                                className="student-card"
                                key={student._id}
                            >

                                <div className="student-avatar">

                                    {student.name
                                        ?.charAt(0)
                                        .toUpperCase()}

                                </div>

                                <div className="student-info">

                                    <h3>
                                        {student.name}
                                    </h3>

                                    <p>
                                        🎓{" "}
                                        {student.course ||
                                            "Course not added"}
                                    </p>
                                    <span className="course-badge">
    {student.course || "Course not added"}
</span>

                                    <p>
                                        🎂 Age: {student.age}
                                    </p>

                                    {/* VIEW DETAILS */}

                                    <Link
                                        to={`/student/${student._id}`}
                                        className="view-btn"
                                    >
                                        View Details →
                                    </Link>

                                    {/* EDIT + DELETE */}

                                    <div className="student-actions">

                                        <Link
                                            to={`/update?id=${student._id}`}
                                            className="card-edit-btn"
                                        >
                                            ✏️ Edit
                                        </Link>

                                        <button
                                            className="card-delete-btn"
                                            onClick={() =>
                                                handleDelete(student)
                                            }
                                        >
                                            🗑️ Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))
                    )}

                </div>

            </section>

            {/* ================================
                ABOUT
            ================================= */}

            <section className="about-section">

                <div className="about-content">

                    <p className="welcome">
                        ABOUT US
                    </p>

                    <h2>
                        About Students Hub
                    </h2>

                    <p>
                        Students Hub is a simple and powerful
                        student management platform designed to
                        manage student information and courses
                        in one place.
                    </p>

                    <p>
                        It helps you add, update, delete and view
                        student details easily through a clean
                        and modern interface.
                    </p>

                </div>

            </section>

            {/* ================================
                CONTACT
            ================================= */}

            <section className="contact-section">

                <div className="contact-content">

                    <p className="welcome">
                        CONTACT US
                    </p>

                    <h2>
                        Get In Touch
                    </h2>

                    <p className="contact-text">
                        Have any questions or suggestions?
                        Feel free to contact us.
                    </p>

                    <div className="contact-cards">

                        <div className="contact-card">

                            <span>📧</span>

                            <h3>
                                Email
                            </h3>

                            <p>
                                studentshub@gmail.com
                            </p>

                        </div>

                        <div className="contact-card">

                            <span>📞</span>

                            <h3>
                                Phone
                            </h3>

                            <p>
                                +91 98765 43210
                            </p>

                        </div>

                        <div className="contact-card">

                            <span>📍</span>

                            <h3>
                                Location
                            </h3>

                            <p>
                                Madurai, Tamil Nadu
                            </p>

                        </div>

                    </div>

                    {/* FOOTER */}

                    <footer className="footer">

                        <div className="footer-logo">
                            🎓 Students Hub
                        </div>

                        <p>
                            Manage Students • Courses • Data
                        </p>

                        <div className="footer-line"></div>

                        <p className="copyright">
                            © 2026 Students Hub. All rights reserved.
                        </p>

                    </footer>

                </div>

            </section>

        </div>
    );
}

export default Students;