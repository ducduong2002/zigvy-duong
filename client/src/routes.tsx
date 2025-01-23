import React from "react";
import Login from "./page/Login";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import TaskPage from "./page/TaskPage";
import ProjectPage from "./page/ProjectPage";

const isAuthenticated = () => {
  // Kiểm tra nếu có token trong localStorage
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  return isAuthenticated() ? <>{element}</> : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: isAuthenticated() ? <Navigate to="/task" /> : <Login />,
  },
  {
    path: "/task",
    element: <PrivateRoute element={<TaskPage />} />,
  },
  {
    path: "/project",
    element: <PrivateRoute element={<ProjectPage />} />,
  },
  {
    path: "/*",
    element: <Navigate to="/login" />,
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
