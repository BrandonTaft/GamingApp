
import { useState } from "react";
// async function getGames() {
//     console.log("getGames ran")
//     const key = "79bd694890ab47a795909bf5e8d434e9"
//     const url = `https://rawg-video-games-database.p.rapidapi.com/games?key=${key}`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': 'a747d3a2b9msh3cd807d00dbc518p1dc9bbjsnb303286096e2',
//             'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
//         }
//     };
//     return fetch(url, options)
// }


  
//   async function getGames() {
//     console.log("getGames ran")
//     localStorage.setItem('loaded', "true")
//     const key = "79bd694890ab47a795909bf5e8d434e9"
//     const url = `https://rawg-video-games-database.p.rapidapi.com/games?key=${key}`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': 'a747d3a2b9msh3cd807d00dbc518p1dc9bbjsnb303286096e2',
//             'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
//         }
//     };
//     let response = await fetch(url, options);
    
//     return response.json()
// }
async function useFetch() {
const [ data, setData] = useState()
const key = "79bd694890ab47a795909bf5e8d434e9"
const url = `https://rawg-video-games-database.p.rapidapi.com/games?key=${key}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '81a4b744a9msh6b3b95471045d35p161e6ejsnbc10536eed20',
		'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
	}
};

fetch(url, options)
	.then(response => response.json())
	.then(response => setData(response))
    .then(response => {
       return data
     } )
	// .catch(err => console.error(err));
}

export async function GameLoader() {
    console.log("loader ran")
    
    const games = await useFetch();
    
    return { games };
  }


// export async function gameLoader(isloaded) {
//     console.log("loader ran")
//     console.log(isloaded)
//     const games = await getGames();
//     return { games };
//   }


// const addDataIntoCache = (cacheName, url, response) => {
//     // Converting our response into Actual Response form
//     const data = new Response(JSON.stringify(response));
  
//     if ('caches' in window) {
//       // Opening given cache and putting our data into it
//       caches.open(cacheName).then((cache) => {
//         cache.put(url, data);
//         alert('Data Added into cache!')
//       });
//     }
//   };