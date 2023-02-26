import { useLoaderData } from "react-router-dom"

export default function Game() {
    const game = useLoaderData()
    console.log("GAME", game)
    return (
        <>
            <div>{game.name}</div>
            {game.cover
                ?
                <div>
                    <img src={`https://images.igdb.com/igdb/image/upload/t_cover_small_2x/${game.cover}.jpg`} />
                </div>
                :
                ""
            }
        </>
    )
}