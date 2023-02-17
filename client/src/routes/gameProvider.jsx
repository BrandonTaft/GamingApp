import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function GameProvider() {
    const [games, setGames] = useState();
    const CLIENT_SECRET = '96665hbpny33kr8iw24m0sei3jeqmt';
    const CLIENT_ID = 'mfqo27rp6ody572sprriz4y71ywe6f';
    const AUTH_URL = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`
    useEffect(() => {
        const getGames = async () => {
            const key = "79bd694890ab47a795909bf5e8d434e9"
            const url = `https://api.rawg.io/api/games?key=${key}&page_size=100`;
            const options = {
                method: 'GET',
                
            };
            const response = await fetch(
                url, options
            );
            const games = await response.json();
            setGames(games.results);
        }
        

        // const getGames = async() => {
        //     fetch('/api/games', {
        //         method: 'GET'
        //       }).then(response => response.json())
        //       .then(result => {
        //         setGames(result)
        //       })
        // }
         getGames()
    
    }, []);

    return (
        <div>
            <Outlet context={[games, setGames]} />
        </div>
    );
}