import { useLoaderData } from "react-router-dom"

function PublicPage() {
    const {games} = useLoaderData()
   console.log(games)
    return(
        <h1>PUBLIC PAGE</h1>
    )
}

export default PublicPage