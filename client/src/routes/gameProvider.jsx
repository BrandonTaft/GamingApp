import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function GameProvider() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            console.log("RAN")
            const key = "79bd694890ab47a795909bf5e8d434e9"
            const url = `https://rawg-video-games-database.p.rapidapi.com/games?key=${key}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '81a4b744a9msh6b3b95471045d35p161e6ejsnbc10536eed20',
                    'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
                }
            };
            const response = await fetch(
                url, options
            );
            const games = await response.json();
            setGames(games);
        }
        fetchGames();
    }, []);

    return (
        <div>
            <Outlet context={[games, setGames]} />;
        </div>
    );
}