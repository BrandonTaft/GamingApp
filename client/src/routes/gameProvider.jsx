import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function GameProvider() {
    const [games, setGames] = useState();
    const CLIENT_SECRET = '96665hbpny33kr8iw24m0sei3jeqmt';
    const CLIENT_ID = 'mfqo27rp6ody572sprriz4y71ywe6f';
    const AUTH_URL = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`
    useEffect(() => {
        // const fetchGames = async () => {
        //     const key = "79bd694890ab47a795909bf5e8d434e9"
        //     const url = `https://rawg-video-games-database.p.rapidapi.com/games?key=${key}&page_size=1000&dates=2019-01-01,2022-12-31&ordering=-added`;
        //     const options = {
        //         method: 'GET',
        //         headers: {
        //             'X-RapidAPI-Key': '81a4b744a9msh6b3b95471045d35p161e6ejsnbc10536eed20',
        //             'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
        //         }
        //     };
        //     const response = await fetch(
        //         url, options
        //     );
        //     const games = await response.json();
        //     setGames(games.results);
        // }
        // fetchGames();
        // const fetchGames = async() => {
        // const fetchTwitchAuth = async () => {
        //    const response = await fetch(AUTH_URL, {
        //         method: 'POST'
        //     })
        //     const auth = await response.json();
        //     return auth.access_token
        // }
        // const getGames = async() => {
        //    const authToken = await fetchTwitchAuth()
        //    console.log("AUTH", authToken)
        //    fetch('https://api.igdb.com/v4/games', {
        //     method: 'POST',
        //     headers: {
        //         'Client-ID': CLIENT_ID,
        //         'Authorization': `Bearer ${authToken}`
        //     }
        //   })
        //   .then(response => response.json())
        //   .then(result => {console.log("RESPONSE", result)})
        // }

        const getGames = async() => {
            fetch('/api/games', {
                method: 'GET'
              }).then(response => response.json())
              .then(result => {
                setGames(result)
              })
        }
        getGames()
    
    }, []);

    return (
        <div>
            <Outlet context={[games, setGames]} />
        </div>
    );
}