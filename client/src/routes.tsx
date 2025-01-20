import React from "react";
import Login from "./page/Login";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import TaskPage from "./page/TaskPage";
// import ProjectPage from "./page/ProjectPage";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/task",
    element: <TaskPage />,
  },
  {
    path: "/project",
    // element: <ProjectPage />,
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
