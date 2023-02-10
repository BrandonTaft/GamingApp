import { useState, useContext } from "react"
import { useLoaderData, useOutletContext } from "react-router-dom";

function PublicPage() {

     
    const [ games, setGames ] = useOutletContext()
  
   console.log(games)
    return(
        <h1>PUBLIC PAGE</h1>
    )
}

export default PublicPage