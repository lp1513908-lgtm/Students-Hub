import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin !== "true") {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
