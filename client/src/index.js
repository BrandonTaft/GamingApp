import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style/App.css";
import Layout from "./routes/layout";
import ErrorPage from "./routes/error-page";
import GameProvider from "./routes/gameProvider";
import Login from "./routes/login";
import PublicPage from "./routes/public-page";
import PrivateRoutes from "./routes/auth";
import ProfilePage from "./routes/profile-page";
import Register from "./routes/register";
import Chat from "./routes/chat";


const router = createBrowserRouter([
  {
    element: <GameProvider />,
    children: [
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PublicPage />,
        //loader: gameLoader,
        // loader: async () => {
        //   let isLoaded = localStorage.getItem('loaded')
        //   gameLoader(isLoaded)
        // },
      },
      {
        path: "/chat",
        element: <Chat />
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
]
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