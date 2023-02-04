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


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "feed",
        element: <PublicPage />,
      },
    ],
  },
  {
    path: "login",
    element: <Login/>,
    errorElement: <ErrorPage />,
  },
  {
    element: <PrivateRoutes/>,
    children: [
      {
        element: <Layout/>,
        children: [
          {
            path: "profile",
            element: <ProfilePage />,
      },
    ],
    }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);