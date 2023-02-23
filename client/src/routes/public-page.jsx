import { useState, useContext, useEffect } from "react"
import { Outlet, NavLink, useOutletContext } from "react-router-dom";
import SearchBar from "../component/SearchBar";
import Comments from "../component/Comments";
import "../style/App.css";

function PublicPage() {
    const [games] = useOutletContext();
    console.log(games)

    const gameList = games.map(game => {
        return (
            <div key={game.id}>
                <NavLink
                    to={`game/${game.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {game.name}
                    {game.cover
                    ?
                    <img src={`https://images.igdb.com/igdb/image/upload/t_cover_small_2x/${game.cover.image_id}.jpg`} />
                  :
                  ""
                    }
                    </NavLink>
            </div>
        )
    })

    return (
        <div className="games">
            <div className="game-list">
                <h1>Games</h1>
                <Comments />
                <SearchBar games={games} />

                <div>
                    {gameList}
                </div>
            </div>
            <div className="game-display">
                <Outlet />
            </div>

        </div>
    )
}

export default PublicPage