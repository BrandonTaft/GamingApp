import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function GameProvider() {
    const [games, setGames] = useState();
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '81a4b744a9msh6b3b95471045d35p161e6ejsnbc10536eed20',
            'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
        }
    };
    
    fetch('https://rawg-video-games-database.p.rapidapi.com/games', options)
        .then(response => response.json())
        .then(response => {setGames(response.results)})
        .catch(err => console.error(err));

        return (
            <Outlet games={games}/>
        )
}