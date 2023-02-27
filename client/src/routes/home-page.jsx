import { useState, useContext, useEffect } from "react"
import { Outlet, NavLink, useOutletContext } from "react-router-dom";
import GameCard from "../component/GameCard";
import SideBar from "../component/SideBar";
import "../style/App.css";

function PublicPage() {
    const [games] = useOutletContext();
    const temp = games.slice(0, 10)
    console.log(games)


    return (
        <div className="flex">
            <div className="flex basis-1/4">
        <SideBar games={games} />
        </div>
        <div className="flex basis-3/4 flex-wrap">
            <GameCard games={games} />
        </div>
        </div>
    )
}

export default PublicPage