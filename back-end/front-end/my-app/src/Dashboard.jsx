import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Dashboard.css";

function Dashboard() {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // Get students
    const fetchStudents = async () => {

        try {

            setLoading(true);
            setError("");

            
                const response = await fetch(
            "https://students-hub-3.onrender.com/users"
);
            

            if (!response.ok) {
                throw new Error("Failed to fetch students");
            }

            const data = await response.json();

            setStudents(data);

        } catch (error) {

            console.log(error);

            setError(
                "Unable to load student information."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchStudents();

    }, []);


    // Course names normalize
    const normalizeCourse = (course) => {

        if (!course) {
            return "Unknown";
        }

        const value = course
            .trim()
            .toLowerCase();

        if (value === "mern" || value === "mern stack") {
            return "MERN Stack";
        }

        if (value === "python") {
            return "Python";
        }

        if (value === "java") {
            return "Java";
        }

        if (value === "aws") {
            return "AWS";
        }

        return course;
    };


    // Total students
    const totalStudents = students.length;


    // Unique courses
    const courseNames = [
        ...new Set(
            students.map(
                student => normalizeCourse(student.course)
            )
        )
    ];

    const totalCourses = courseNames.length;


    // Average age
    const validAges = students
        .map(student => Number(student.age))
        .filter(age => !isNaN(age) && age > 0);

    const averageAge =
        validAges.length > 0
            ? (
                validAges.reduce(
                    (sum, age) => sum + age,
                    0
                ) / validAges.length
            ).toFixed(1)
            : "0";


    // Course statistics
    const courses = [
        {
            name: "Python",
            icon: "🐍",
            path: "python"
        },
        {
            name: "Java",
            icon: "☕",
            path: "java"
        },
        {
            name: "MERN Stack",
            icon: "⚛️",
            path: "mern"
        },
        {
            name: "AWS",
            icon: "☁️",
            path: "aws"
        }
    ];


    const getCourseCount = (courseName) => {

        return students.filter(
            student =>
                normalizeCourse(student.course) === courseName
        ).length;

    };


    // Popular course
    let popularCourse = "—";
    let highestCount = 0;

    courses.forEach(course => {

        const count = getCourseCount(course.name);

        if (count > highestCount) {

            highestCount = count;
            popularCourse = course.name;

        }

    });


    if (loading) {

        return (
            <div className="dashboard-page">

                <Navbar />

                <div className="dashboard-loading">

                    <div className="dashboard-loader"></div>

                    <h2>
                        Loading Dashboard...
                    </h2>

                    <p>
                        Fetching student information.
                    </p>

                </div>

            </div>
        );

    }


    if (error) {

        return (
            <div className="dashboard-page">

                <Navbar />

                <div className="dashboard-error">

                    <div className="error-icon">
                        ❌
                    </div>

                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={fetchStudents}
                        className="retry-dashboard-btn"
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );

    }


    return (

        <div className="dashboard-page">

            <Navbar />


            {/* Dashboard Header */}

            <section className="dashboard-header">

                <div>

                    <p className="dashboard-label">
                        ADMIN CONTROL PANEL
                    </p>

                    <h1>
                        Dashboard
                    </h1>

                    <p className="dashboard-subtitle">
                        Manage students, courses and academic
                        information from one place.
                    </p>

                </div>


                <div className="admin-badge">
                    🔐 Admin
                </div>

            </section>


            {/* Statistics */}

            <section className="dashboard-stats">


                <div className="dashboard-stat-card">

                    <div className="stat-icon">
                        👨‍🎓
                    </div>

                    <div>

                        <p>
                            Total Students
                        </p>

                        <h2>
                            {totalStudents}
                        </h2>

                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon">
                        📚
                    </div>

                    <div>

                        <p>
                            Total Courses
                        </p>

                        <h2>
                            {totalCourses}
                        </h2>

                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon">
                        🎂
                    </div>

                    <div>

                        <p>
                            Average Age
                        </p>

                        <h2>
                            {averageAge}
                        </h2>

                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon">
                        🏆
                    </div>

                    <div>

                        <p>
                            Popular Course
                        </p>

                        <h2 className="popular-course">
                            {popularCourse}
                        </h2>

                    </div>

                </div>

            </section>


            {/* Course Statistics */}

            <section className="dashboard-section">

                <div className="section-heading">

                    <div>

                        <p className="dashboard-label">
                            COURSE OVERVIEW
                        </p>

                        <h2>
                            Course Statistics
                        </h2>

                    </div>

                </div>


                <div className="dashboard-course-grid">

                    {courses.map(course => {

                        const count =
                            getCourseCount(course.name);

                        const percentage =
                            totalStudents > 0
                                ? (count / totalStudents) * 100
                                : 0;


                        return (

                            <Link
                                key={course.name}
                                to={`/course/${course.path}`}
                                className="dashboard-course-card"
                            >

                                <div className="course-top">

                                    <div className="dashboard-course-icon">
                                        {course.icon}
                                    </div>

                                    <span>
                                        {count} students
                                    </span>

                                </div>


                                <h3>
                                    {course.name}
                                </h3>


                                <div className="course-progress">

                                    <div
                                        className="course-progress-bar"
                                        style={{
                                            width: `${percentage}%`
                                        }}
                                    ></div>

                                </div>


                                <p>
                                    {percentage.toFixed(0)}%
                                    of students
                                </p>

                            </Link>

                        );

                    })}

                </div>

            </section>


            {/* Quick Actions */}

            <section className="dashboard-section">

                <div className="section-heading">

                    <div>

                        <p className="dashboard-label">
                            MANAGEMENT
                        </p>

                        <h2>
                            Quick Actions
                        </h2>

                    </div>

                </div>


                <div className="quick-actions">


                    {/* Add */}

                    <Link
                        to="/insert"
                        className="quick-action"
                    >

                        <span className="quick-action-icon">
                            ➕
                        </span>

                        <div>

                            <h3>
                                Add Student
                            </h3>

                            <p>
                                Add a new student
                            </p>

                        </div>

                    </Link>


                    {/* View */}

                    <Link
                        to="/students"
                        className="quick-action"
                    >

                        <span className="quick-action-icon">
                            👨‍🎓
                        </span>

                        <div>

                            <h3>
                                View Students
                            </h3>

                            <p>
                                View all students
                            </p>

                        </div>

                    </Link>


                    {/* Update */}

                    <Link
                        to="/update"
                        className="quick-action"
                    >

                        <span className="quick-action-icon">
                            ✏️
                        </span>

                        <div>

                            <h3>
                                Update Student
                            </h3>

                            <p>
                                Edit student information
                            </p>

                        </div>

                    </Link>


                    {/* Delete */}

                    <Link
                        to="/delete"
                        className="quick-action"
                    >

                        <span className="quick-action-icon">
                            🗑️
                        </span>

                        <div>

                            <h3>
                                Delete Student
                            </h3>

                            <p>
                                Remove a student
                            </p>

                        </div>

                    </Link>


                </div>

            </section>


            {/* Footer */}

            <footer className="dashboard-footer">

                <p>
                    Students Hub Admin Panel
                </p>

                <p>
                    © 2026 Students Hub
                </p>

            </footer>

        </div>

    );
}

export default Dashboard;