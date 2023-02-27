import { useLoaderData } from "react-router-dom";
import GameCard from "./GameCard";

export default function Game() {
    const game = useLoaderData()
    return (
            <GameCard game={game}/>
    )
}