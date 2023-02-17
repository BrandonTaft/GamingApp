import { useState, useContext, useEffect } from "react"
import { useLoaderData, useOutletContext } from "react-router-dom";
import SearchBar from "../component/SearchBar";
import Comments from "../component/Comments";

function PublicPage() {


    const [games, setGames] = useOutletContext()
    

    return (
        <>
            <h1>PUBLIC PAGE</h1>
            <Comments />
            <SearchBar games={games} />
        </>
    )
}

export default PublicPage