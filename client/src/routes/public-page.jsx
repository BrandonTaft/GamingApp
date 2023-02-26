import { useState, useContext, useEffect } from "react"
import { Outlet, NavLink, useOutletContext } from "react-router-dom";
import GameList from "../component/GameList";
import "../style/App.css";

function PublicPage() {
    const [games] = useOutletContext();
    const temp = games.slice(0, 10)
    console.log(games)


    return (
        <div className="games">
            <div className="game-list">
                <GameList />
            </div>
            <div className="game-display">
                <Outlet />
            </div>

        </div>
    )
}

export default PublicPage