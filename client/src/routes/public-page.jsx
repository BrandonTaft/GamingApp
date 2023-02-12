import { useState, useContext } from "react"
import { useLoaderData, useOutletContext } from "react-router-dom";
import SearchBar from "../component/SearchBar";

function PublicPage() {


    const [games, setGames] = useOutletContext()
    
   async function sort() {
   for(let i = 0; i < games.length; i++) {
    console.log(games[i].name)
   }
}
sort()
    return (
        <>
            <h1>PUBLIC PAGE</h1>
            <SearchBar games={games} />
        </>
    )
}

export default PublicPage