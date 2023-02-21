
const apicalypse = require('apicalypse').default;
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
            // axios({
            //     url: "https://api.igdb.com/v4/age_ratings",
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //                 'Client-ID': CLIENT_ID,
            //                 'Authorization': `Bearer ${authToken}`,
            //     },
            //    // data: "fields category,checksum,content_descriptions,rating,rating_cover_url,synopsis;"
            //   })
            //     .then(response => {
            //         res.json(response.data);
            //     })
            //     .catch(err => {
            //         console.error(err);
            //     });
            const response = await apicalypse({
                method: "POST",
                headers: {
                         'Accept': 'application/json',
                        'Client-ID': CLIENT_ID,
                        'Authorization': `Bearer ${authToken}`
            }
                    })
            .fields([ 'name', 'cover', 'summary', 'first_release_date', 'rating', 'rating_count'])
            .where(['rating = 100'])
            //.query('name', 'name = smash')
            .limit(100)
            .sort('name', 'desc')
            .request('https://api.igdb.com/v4/games');
        res.json(response.data);
        }
        getGames()
    })

  
    module.exports = router