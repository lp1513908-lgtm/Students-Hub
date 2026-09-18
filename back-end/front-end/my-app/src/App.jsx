import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

import Students from "./Students";
import AddStudent from "./AddStudent";
import UpdateStudent from "./UpdateStudent";
import DeleteStudent from "./DeleteStudent";
import CourseStudents from "./CourseStudents";
import StudentDetails from "./StudentDetails";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";

import ProtectedRoute from "./ProtectedRoute";

import "./App.css";

function App() {

    const router = createBrowserRouter([
        // =========================
        // PUBLIC PAGES
        // =========================

        {
            path: "/",
            element: <Home />
        },

        {
            path: "/login",
            element: <Login />
        },

        {
            path: "/register",
            element: <Register />
        },


        // =========================
        // ADMIN PAGES
        // =========================

        {
            path: "/dashboard",
            element: (
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            )
        },

        {
            path: "/students",
            element: (
                <ProtectedRoute>
                    <Students />
                </ProtectedRoute>
            )
        },

        {
            path: "/insert",
            element: (
                <ProtectedRoute>
                    <AddStudent />
                </ProtectedRoute>
            )
        },

        {
            path: "/update",
            element: (
                <ProtectedRoute>
                    <UpdateStudent />
                </ProtectedRoute>
            )
        },

        {
            path: "/delete",
            element: (
                <ProtectedRoute>
                    <DeleteStudent />
                </ProtectedRoute>
            )
        },

        {
            path: "/course/:course",
            element: (
                <ProtectedRoute>
                    <CourseStudents />
                </ProtectedRoute>
            )
        },

        {
            path: "/student/:id",
            element: (
                <ProtectedRoute>
                    <StudentDetails />
                </ProtectedRoute>
            )
        },


        // =========================
        // 404
        // =========================

        {
            path: "*",
            element: <NotFound />
        }
    ]);

    return <RouterProvider router={router} />;
}

export default App;