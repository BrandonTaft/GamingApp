import { useState, useContext, useEffect } from "react"
import { Outlet, NavLink, useOutletContext } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../style/App.css";

export default function SideBar({games}) {
    console.log(games)
    // const gameList = temp.map(game => {
    //     return (
    //         <div key={game.id}>
    //             <NavLink
    //                 to={`game/${game.igdb_id}`}
    //                 className={({ isActive, isPending }) =>
    //                   isActive
    //                     ? "active"
    //                     : isPending
    //                     ? "pending"
    //                     : ""
    //                 }
    //               >
    //                 {game.name}
    //                 <p>{new Date(game.first_release_date * 1000).toLocaleDateString()}</p>
    //                 </NavLink>
    //         </div>
    //     )
    // })

    return (
        <>
            {/* <div className="game-list">
                <h1>Games</h1>  
                <SearchBar games={games}/>
                <div>
                    {gameList}
                </div>
                <div>
                    GAMES
                </div>
            </div> */}
            <div className="flex-grow bg-slate-900">
                <h1>SIDEBAR</h1>  
            </div>
        </>
    )
}