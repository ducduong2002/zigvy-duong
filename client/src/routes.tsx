import React from "react";
import Login from "./components/Login";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
// import Login from "./testttttttttttt/logintest";
// import Home from "./testttttttttttt/hometest";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <HomePage />,
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
