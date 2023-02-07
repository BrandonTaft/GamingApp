import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style/index.css";
import Layout from "./routes/layout";
import ErrorPage from "./routes/error-page";
import Login from "./routes/login";
import PublicPage from "./routes/public-page";
import PrivateRoutes from "./routes/auth";
import ProfilePage from "./routes/profile-page";
import Register from "./routes/register";
import { gameLoader } from "./loaders/loaders";


const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PublicPage />,
        loader: gameLoader,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "profile",
            element: <ProfilePage />
          }
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "register",
    element: <Register />,
     errorElement: <ErrorPage />
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);