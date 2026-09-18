import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {

        const isAdmin = localStorage.getItem("isAdmin");

        if (isAdmin === "true") {
            navigate("/dashboard", { replace: true });
        }

    }, [navigate]);

    const courses = [
        {
            name: "Python",
            icon: "🐍",
            description: "Learn Python programming and build useful applications."
        },
        {
            name: "Java",
            icon: "☕",
            description: "Learn Java programming and object-oriented development."
        },
        {
            name: "MERN Stack",
            icon: "⚛️",
            description: "Learn MongoDB, Express, React and Node.js."
        },
        {
            name: "AWS",
            icon: "☁️",
            description: "Explore cloud computing and AWS fundamentals."
        }
    ];

    return (
        <div className="home-page">

            <header className="home-header">
                <div className="home-logo">
                    🎓 Students Hub
                </div>

                <Link to="/login" className="staff-login-btn">
                    🔐 Staff / Admin Login
                </Link>
            </header>

            <main>

                <section className="home-hero">

                    <p className="home-label">
                        WELCOME TO
                    </p>

                    <h1>
                        Students Hub
                    </h1>

                    <p className="home-description">
                        Explore available courses, learn new skills,
                        and register for your preferred course.
                    </p>

                    <Link to="/register" className="register-home-btn">
                        📝 Register as Student
                    </Link>

                </section>


                <section className="courses-section">

                    <p className="section-label">
                        LEARNING PROGRAMS
                    </p>

                    <h2>
                        Available Courses
                    </h2>

                    <p className="section-description">
                        Choose a course that matches your learning goals.
                    </p>


                    <div className="course-grid">

                        {courses.map((course) => (

                            <div
                                className="public-course-card"
                                key={course.name}
                            >

                                <div className="public-course-icon">
                                    {course.icon}
                                </div>

                                <h3>
                                    {course.name}
                                </h3>

                                <p>
                                    {course.description}
                                </p>

                                <Link
                                    to="/register"
                                    className="course-register-link"
                                >
                                    Register →
                                </Link>

                            </div>

                        ))}

                    </div>

                </section>

            </main>


            <footer className="home-footer">

                <p>
                    © 2026 Students Hub
                </p>

                <p>
                    Student Registration & Course Portal
                </p>

            </footer>

        </div>
    );
}

export default Home;