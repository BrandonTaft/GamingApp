const axios = require('axios');
const apicalypse = require('apicalypse').default;
router = require("express").Router();

const CLIENT_SECRET = '96665hbpny33kr8iw24m0sei3jeqmt';
const CLIENT_ID = 'mfqo27rp6ody572sprriz4y71ywe6f';
const AUTH_URL = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`

   
    router.get('/games', async (req, res) => {
        const fetchTwitchAuth = async () => {
            const response = await axios.post(AUTH_URL)
            return response.data.access_token
        }
  
        const getGames = async () => {
            console.log("RANNNN")
            const authToken = await fetchTwitchAuth()
            const response = await apicalypse({
                method: "POST",
                headers: {
                         'Accept': 'application/json',
                        'Client-ID': CLIENT_ID,
                        'Authorization': `Bearer ${authToken}`
            }
                    })
            .fields([ 'name', 'cover.*', 'summary', 'first_release_date', 'total_rating', 'rating_count', 'screenshots.*'])
            .where(['total_rating > 80'])
            //.search('Smash')
            //.query('name', 'name = smash')
            .limit(50)
            .sort('first_release_date', 'desc')
            .sort('total_rating', 'desc')
            .request('https://api.igdb.com/v4/games');
        res.json(response.data);
        }
        getGames()
    })

    router.get('/game/:gameId', async (req, res) => {
        const gameId = req.params.gameId
        const fetchTwitchAuth = async () => {
            const response = await axios.post(AUTH_URL)
            return response.data.access_token
        }
  
        const getOneGame = async () => {
            console.log("RANNNN for one", gameId)
            const authToken = await fetchTwitchAuth()
            const response = await apicalypse({
                method: "POST",
                headers: {
                         'Accept': 'application/json',
                        'Client-ID': CLIENT_ID,
                        'Authorization': `Bearer ${authToken}`
            }
                    })
            .fields([ 'name', 'cover.*', 'summary', 'first_release_date', 'total_rating', 'rating_count', 'screenshots.*'])
            .where(`id = ${gameId}`)
            .request('https://api.igdb.com/v4/games');
        res.json(response.data);
        }
        getOneGame()
    })

  
    module.exports = router