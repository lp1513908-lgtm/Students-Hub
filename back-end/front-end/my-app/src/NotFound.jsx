import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    return (
        <div className="not-found-page">

            <div className="not-found-card">

                <div className="not-found-icon">
                    🔍
                </div>

                <p className="not-found-label">
                    STUDENTS HUB
                </p>

                <h1>
                    404
                </h1>

                <h2>
                    Page Not Found
                </h2>

                <p className="not-found-text">
                    Sorry, the page you're looking for
                    doesn't exist or may have been moved.
                </p>

                <Link
                    to="/"
                    className="not-found-btn"
                >
                    ← Back to Students
                </Link>

            </div>

        </div>
    );
}

export default NotFound;