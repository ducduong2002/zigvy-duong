import React, { Suspense, lazy } from "react";
import Login from "./page/Login";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ErrorPage from "./status/error-page";
import SkeletonLoader from "./status/loading-skeleton"; 

const TaskPage = lazy(() => import("./page/TaskPage"));
const ProjectPage = lazy(() => import("./page/ProjectPage"));

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  return isAuthenticated() ? <>{element}</> : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: isAuthenticated() ? <Navigate to="/task" /> : <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/task",
    element: (
      <Suspense fallback={<SkeletonLoader />}>
        <PrivateRoute element={<TaskPage />} />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/project",
    element: (
      <Suspense fallback={<SkeletonLoader />}>
        <PrivateRoute element={<ProjectPage />} />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
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
