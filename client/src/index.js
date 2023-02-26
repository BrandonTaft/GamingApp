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
import PendingElement from "./component/PendingElement";
import Game from "./component/Game";


const router = createBrowserRouter([
  {
    element: <GameProvider />,
    loader: async () => {
      const response = await fetch(`/igdb/games`)
      const games = await response.json()
      return games
    },
    shouldRevalidate: () => false,
    children: [
      {
        element: <Layout />,
        path: "/",
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/feed",
            element: <PublicPage />,
            children: [
              {
                path: "game/:gameId",
                element: <Game />,
                pendingElement: <PendingElement />,
                loader: async ({ params }) => {
                  const response = await fetch(`/igdb/game/${params.gameId}`)
                  const game = await response.json()
                  return game
                }
              }
            ]
          },
          {
            path: "/chat",
            element: <Chat />,

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