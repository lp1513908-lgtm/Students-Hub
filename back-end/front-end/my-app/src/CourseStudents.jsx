import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./CourseStudents.css";
function CourseStudents() {

    const { course } = useParams();

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let courseName = course;

        if (course.toLowerCase() === "mern") {
            courseName = "MERN Stack";
        }

        setLoading(true);

        fetch(
            `http://localhost:3000/course/${encodeURIComponent(courseName)}`
        )
            .then((res) => res.json())
            .then((data) => {
                setStudents(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, [course]);


    const displayCourse =
        course === "mern"
            ? "MERN Stack"
            : course.charAt(0).toUpperCase() + course.slice(1);


    return (

        <div className="course-page">

            {/* BACK BUTTON */}

            <Link to="/" className="home-link">
                ← Back to Students
            </Link>


            {/* HEADER */}

            <div className="course-header">

                <p className="welcome">
                    COURSE DETAILS
                </p>

                <h1>
                    {displayCourse} Students
                </h1>

                <p>
                    Students currently enrolled in {displayCourse}
                </p>

            </div>


            {/* TOTAL STUDENTS */}

            <div className="course-count">

                <div className="count-icon">
                    👨‍🎓
                </div>

                <div>
                    <h2>
                        {students.length}
                    </h2>

                    <p>
                        Total Students
                    </p>
                </div>

            </div>


            {/* STUDENT LIST */}

            <div className="course-student-list">

                {loading ? (

                    <div className="course-message">

                        <h2>
                            Loading...
                        </h2>

                        <p>
                            Fetching student details.
                        </p>

                    </div>

                ) : students.length === 0 ? (

                    <div className="course-message">

                        <h2>
                            No Students Found
                        </h2>

                        <p>
                            No students are currently enrolled
                            in this course.
                        </p>

                    </div>

                ) : (

                    students.map((student) => (

                        <div
                            className="course-student-card"
                            key={student._id}
                        >

                            {/* AVATAR */}

                            <div className="course-avatar">

                                {student.name
                                    ?.charAt(0)
                                    .toUpperCase()}

                            </div>


                            {/* STUDENT INFO */}

                            <div className="course-student-info">

                                <h2>
                                    {student.name}
                                </h2>

                                <p>
                                    🎓 {student.course}
                                </p>

                                <p>
                                    🎂 Age: {student.age}
                                </p>

                            </div>


                            {/* VIEW DETAILS */}

                            <Link
                                to={`/student/${student._id}`}
                                className="course-view-btn"
                            >
                                View Details →
                            </Link>

                        </div>

                    ))

                )}

            </div>

        </div>

    );
}

export default CourseStudents;