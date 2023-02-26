const axios = require('axios');
const apicalypse = require('apicalypse').default;
router = require("express").Router();
const games = require("../controllers/game.controller.js");

const CLIENT_SECRET = '96665hbpny33kr8iw24m0sei3jeqmt';
const CLIENT_ID = 'mfqo27rp6ody572sprriz4y71ywe6f';
const AUTH_URL = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`


router.get('/games', games.getAllGames)

router.get('/game/:gameId', games.findGameById)

// router.get('/game/:gameId', async (req, res) => {
//     const gameId = req.params.gameId
//     const fetchTwitchAuth = async () => {
//         const response = await axios.post(AUTH_URL)
//         return response.data.access_token
//     }

//     const getOneGame = async () => {
//         console.log("RANNNN for one", gameId)
//         const authToken = await fetchTwitchAuth()
//         const response = await apicalypse({
//             method: "POST",
//             headers: {
//                 'Accept': 'application/json',
//                 'Client-ID': CLIENT_ID,
//                 'Authorization': `Bearer ${authToken}`
//             }
//         })
//             .fields([
//                 'name', 'cover.*', 'genres', 'follows',
//                 'platforms', 'url', 'videos.*', 'summary',
//                 'first_release_date', 'total_rating', 'total_rating_count'
//             ])
//             .where(`id = ${gameId}`)
//             .request('https://api.igdb.com/v4/games');
//         console.log(response.data[0].genres.toString())
//         res.json(response.data);
//     }
//     getOneGame()
// })


module.exports = router