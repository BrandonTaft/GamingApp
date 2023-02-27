import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/layout";
import ErrorPage from "./routes/error-page";
import GameProvider from "./routes/gameProvider";
import Login from "./routes/login";
import HomePage from "./routes/home-page";
import GameCard from "./component/GameCard";
import PrivateRoutes from "./routes/auth";
import ProfilePage from "./routes/profile-page";
import Register from "./routes/register";
import Chat from "./routes/chat";
import PendingElement from "./component/PendingElement";
import Game from "./component/Game";
import SideBar from "./component/SideBar";


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
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
            path: "/",
            element: <HomePage />,
            errorElement: <ErrorPage />,
            children: [
              {
                path: "game/:gameId",
                element: <Game />,
                errorElement: <ErrorPage />,
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
            errorElement: <ErrorPage />,
          },
          {
            element: <PrivateRoutes />,
            children: [
              {
                path: "profile",
                element: <ProfilePage />,
                errorElement: <ErrorPage />,
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