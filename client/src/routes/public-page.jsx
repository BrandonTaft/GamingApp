import { useState, useContext, useEffect } from "react"
import { useLoaderData, useOutletContext } from "react-router-dom";
import SearchBar from "../component/SearchBar";

function PublicPage() {


    const [games, setGames] = useOutletContext()
    

    return (
        <>
            <h1>PUBLIC PAGE</h1>
            <SearchBar games={games} />
        </>
    )
}

export default PublicPage