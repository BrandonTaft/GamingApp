
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

// export async function gameLoader() {
//     console.log("loader ran")
//     const games = await getGames();
//     return { games };
//   }
  
  async function getGames() {
    
    if( localStorage.getItem('loaded') !== "true" ) {
        console.log(localStorage.getItem('loaded'))
        console.log("getGames ran")
    const key = "79bd694890ab47a795909bf5e8d434e9"
    const url = `https://rawg-video-games-database.p.rapidapi.com/games?key=${key}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a747d3a2b9msh3cd807d00dbc518p1dc9bbjsnb303286096e2',
            'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
        }
    };
    let response = await fetch(url, options);

    return response.json()
    }
}

export async function gameLoader() {
    console.log("loader ran")
    localStorage.setItem('loaded', "true")
    const games = await getGames();
    return { games };
  }
