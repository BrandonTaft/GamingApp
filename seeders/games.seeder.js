
export default function gamesSeeder() {
    const fetchTwitchAuth = async () => {
        const response = await axios.post(AUTH_URL)
        return response.data.access_token
    }

    const getGames = async () => {
        const authToken = await fetchTwitchAuth()
        const response = await apicalypse({
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Client-ID': CLIENT_ID,
                'Authorization': `Bearer ${authToken}`
            }
        })
        .multi([
            // Top 500 By Rating
            apicalypse()
            .fields([
                'name', 'cover.*', 'genres', 'follows',
                'platforms', 'url', 'videos.video_id', 'summary', 'hypes',
                'first_release_date', 'total_rating', 'total_rating_count'
            ])
            .where(['total_rating_count > 100'])
            .sort('total_rating', 'desc')
            .limit(500),
            // Top 500 By Follows
            apicalypse()
            .fields([
                'name', 'cover.*', 'genres', 'follows',
                'platforms', 'url', 'videos.video_id', 'summary', 'hypes',
                'first_release_date', 'total_rating', 'total_rating_count'
            ])
            .where(['follows > 10'])
            .sort('follows', 'desc')
            .limit(500)
        ])
            .request('https://api.igdb.com/v4/games');
        res.json(response.data);
        for (let i = 0; i < response.data.length; i++) {
            games.createGame(response.data[i])
        }
    }
    getGames()
}