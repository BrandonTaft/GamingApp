const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const db = require("./models");
const controller = require("./controllers/user.controller");
const sequelize = require('sequelize');
//const models = require('./models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = 10;
var corsOptions = {
    origin: "http://localhost:3000"
  };
app.use(cors(corsOptions));
app.use(express.json({ limit: 52428800 }));
app.use(express.urlencoded({ extended: true, limit: 52428800 }));
const PORT = process.env.PORT || 3001;

const CLIENT_SECRET = '96665hbpny33kr8iw24m0sei3jeqmt';
const CLIENT_ID = 'mfqo27rp6ody572sprriz4y71ywe6f';
const AUTH_URL = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`

// app.use(express.static(path.resolve(__dirname, './client/build')));
// const run = async () => {
//     const user = await controller.createUser({
//         name: "John",
//         email: "btaft6278@gmail.com",
//         isLoggedIn: true
//       });
// };

db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   run();
// });
// db.sequelize.sync()
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });



app.get("/api", (req, res) => {
  res.json({ message: "Hi There!" });
});

//***************************REGISTRATION PAGE***************************//

app.post('/api/register', async (req, res) => {
    console.log(req.body)
  const name = req.body.name
  const password = req.body.password
//   const persistedUser = await models.Users.findOne({
//       where: sequelize.where(
//           sequelize.fn('lower', sequelize.col('name')),
//           sequelize.fn('lower', name)
//       )
//   })
const persistedUser = await controller.findUserByName(name)
  console.log(persistedUser)
  if (persistedUser == null) {
      bcrypt.hash(password, salt, async (error, hash) => {
          if (error) {
              res.json({ message: "Something Went Wrong!!!" })
          } else {
            const user = await controller.createUser({
                name: name,
                password: hash,
                isLoggedIn: false,
              });
              //let savedUser = await user.save()
              if (user != null) {
                  res.json({ success: true })
              }
          }
      })
  } else {
      res.json({ message: " Sorry This UserName Already Exists" })
  }
})

//***************************LOGIN PAGE***************************//

app.post('/api/login', async (req, res) => {
    const name = req.body.name
    const password = req.body.password
    let user = await models.Users.findOne({
        where: sequelize.where(
            sequelize.fn('lower', sequelize.col('name')),
            sequelize.fn('lower', name)
        )
    })
    if (user != null) {
        bcrypt.compare(password, user.password, (error, result) => {
            if (result) {
                models.Users.update(
                    { isLoggedIn: true },
                    { where: { id: user.id } }
                )
                const token = jwt.sign({ id: user.id }, "SECRETKEY")
                res.json({ success: true, token: token, user: user })
            } else {
                res.json({ success: false, message: 'Not Authenticated' })
            }
        })
    } else {
        res.json({ message: "Username Incorrect" })
    }
})

app.get('/api/games', async (req,res) => {
    console.log("RAN")
   
        const fetchTwitchAuth = async () => {
           const response = await fetch(AUTH_URL, {
                method: 'POST'
            })
            const auth = await response.json();
            return auth.access_token
        }
    
        const getGames = async() => {
               const authToken = await fetchTwitchAuth()
               console.log("AUTH", authToken)
               fetch('https://api.igdb.com/v4/games', {
                method: 'POST',
                headers: {
                    'Client-ID': CLIENT_ID,
                    'Authorization': `Bearer ${authToken}`,
                },
                
                body:'fields name, screenshots; limit 100;'
              })
              .then(response => response.json())
              .then(result => {res.json(result)})
            }
            getGames()
})

//***************************ADD COMMENTS TO DATABASE***************************//
app.post('/api/addcomment:gameId', async (req, res) => {
    const userId = parseInt(req.body.userId)
    const comment = {
     text: req.body.comment,
     game: req.body.game,
     gameId: parseInt(req.params.gameId),
     name: req.body.user,
    }
    const savedComment = await controller.createComment(userId, comment)
        if(savedComment) {
            res.json({ success: true })
        }
})

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});