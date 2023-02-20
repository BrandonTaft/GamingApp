router = require("express").Router();

const CLIENT_SECRET = '96665hbpny33kr8iw24m0sei3jeqmt';
const CLIENT_ID = 'mfqo27rp6ody572sprriz4y71ywe6f';
const AUTH_URL = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`
    
    // Create A Game
    router.post('/games', async (req, res) => {
        console.log("RAN")
    
        const fetchTwitchAuth = async () => {
            const response = await fetch(AUTH_URL, {
                method: 'POST'
            })
            const auth = await response.json();
            return auth.access_token
        }
    
        const getGames = async () => {
            const authToken = await fetchTwitchAuth()
            console.log("AUTH", authToken)
            fetch('https://api.igdb.com/v4/games', {
                method: 'POST',
                headers: {
                     'Accept': 'application/json',
                    'Client-ID': CLIENT_ID,
                    'Authorization': `Bearer ${authToken}`,
                },
    
                body: 'fields name,aggregated_rating; sort aggregated_rating asc where platform = 48; limit 500; offset 25000;'
            })
                .then(response => response.json())
                .then(result => { res.json(result) })
        }
        getGames()
    })

  
    module.exports = router