import { useState, useContext, useEffect } from "react"
import { Outlet, NavLink, useOutletContext } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../style/App.css";

function GameList() {
    const [games] = useOutletContext();
    const temp = games.slice(0,10)
    console.log(games)

    const gameList = temp.map(game => {
        return (
            <div key={game.id}>
                <NavLink
                    to={`game/${game.igdb_id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {game.name}
                    <p>{new Date(game.first_release_date * 1000).toLocaleDateString()}</p>
                    </NavLink>
            </div>
        )
    })

    return (
        <div className="game-search">
            <div className="game-list">
                <h1>Games</h1>  
                <SearchBar games={games}/>
                <div>
                    {gameList}
                </div>
                <div>
                    GAMES
                </div>
            </div>
            <div className="game-display">
                <h1>Games</h1>  
                <div>
                    GAMES
                </div>
            </div>
        </div>
    )
}

export default GameList