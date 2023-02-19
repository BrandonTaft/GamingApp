const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('sequelize');
const db = require("./models");
const controller = require("./controllers/user.controller");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = 10;
const cors = require('cors');
var corsOptions = {
    origin: "http://localhost:3000"
};
const userRouter = require('./routes/user.routes');
const commentRouter = require('./routes/comment.routes')

app.use(cors(corsOptions));
app.use(express.json({ limit: 52428800 }));
app.use(express.urlencoded({ extended: true, limit: 52428800 }));
//app.use(express.static(path.resolve(__dirname, './client/build')));

const PORT = process.env.PORT || 3001;
const CLIENT_SECRET = '96665hbpny33kr8iw24m0sei3jeqmt';
const CLIENT_ID = 'mfqo27rp6ody572sprriz4y71ywe6f';
const AUTH_URL = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });



app.get("/api", (req, res) => {
    res.json({ message: "Hi There!" });
});




app.get('/api/games', async (req, res) => {
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
                'Client-ID': CLIENT_ID,
                'Authorization': `Bearer ${authToken}`,
            },

            body: 'fields name, screenshots; limit 100;'
        })
            .then(response => response.json())
            .then(result => { res.json(result) })
    }
    getGames()
})

// //***************************ADD COMMENTS TO DATABASE***************************//
// app.post('/api/addcomment:gameId', async (req, res) => {
//     const userId = parseInt(req.body.userId)
//     const comment = {
//         text: req.body.comment,
//         game: req.body.game,
//         gameId: parseInt(req.params.gameId),
//         name: req.body.user,
//     }
//     const savedComment = await controller.createComment(userId, comment)
//     if (savedComment) {
//         res.json({ success: true })
//     }
// })

app.use('/api', userRouter, commentRouter)

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
// });

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});