import { createBrowserRouter } from "react-router";

import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import Protected from "./features/auth/components/Protected.jsx";
import ProtectedLayout from "./features/interview/components/ProtectedLayout.jsx";
import Dashboard from "./features/interview/pages/Dashboard.jsx";
import Home from "./features/interview/pages/Home.jsx";
import Interview from "./features/interview/pages/Interview.jsx";
import Reports from "./features/interview/pages/Reports.jsx";
import Profile from "./features/interview/pages/Profile.jsx";

const protectedRoute = (element) => <Protected><ProtectedLayout>{element}</ProtectedLayout></Protected>;

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: protectedRoute(<Dashboard />),
  },
  {
    path: "/interview/new",
    element: protectedRoute(<Home />),
  },
  {
    path: "/interview/:interviewId",
    element: protectedRoute(<Interview />),
  },
  {
    path: "/reports",
    element: protectedRoute(<Reports />),
  },
  {
    path: "/profile",
    element: protectedRoute(<Profile />),
  },
]);
