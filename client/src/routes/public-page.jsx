import { useState } from "react"
import { useLoaderData } from "react-router-dom"

function PublicPage() {
    //const [ games, setGames ] = useState({})
    const { games } = useLoaderData()
    // setGames(data)
   console.log(games)
    return(
        <h1>PUBLIC PAGE</h1>
    )
}

export default PublicPage