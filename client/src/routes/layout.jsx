import { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Footer from '../component/Footer';
import Navbar from "../component/Navbar";

let GAMES;

export default function Layout() {
  // const [games, setGames] = useState();
  // useEffect(() => {
  //   if (GAMES !== undefined) {
  //     return;
  //   }

  //   const key = "79bd694890ab47a795909bf5e8d434e9"
  //   const url = `https://rawg-video-games-database.p.rapidapi.com/games?key=${key}`;
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'X-RapidAPI-Key': '81a4b744a9msh6b3b95471045d35p161e6ejsnbc10536eed20',
  //       'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
  //     }
  //   };

  //   fetch(url, options)
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log("FETCHED")
  //       GAMES = response
  //       setGames(response)
  //     })
  //     .catch(err => console.error(err));

  // }, [])
  const [ games, setGames ] = useOutletContext()
  return (
    <div>
      <Navbar />
      <Outlet context={[games, setGames]} />
      <Footer />
    </div>
  )
}