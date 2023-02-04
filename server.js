const path = require('path');
const express = require('express');
const app = express();
const sequelize = require('sequelize');
const models = require('./models');
const bcrypt = require('bcryptjs');
const salt = 10;
const bodyParser = require('body-parser');
app.use(express.json({ limit: 52428800 }));
const PORT = process.env.PORT || 3001;


app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(bodyParser.urlencoded({ extended: false })) 
app.get("/api", (req, res) => {
  res.json({ message: "Hi There!" });
});

//***************************REGISTRATION PAGE***************************//

app.post('/api/register', async (req, res) => {
    console.log(req.body)
  const name = req.body.name
  const password = req.body.password
  const persistedUser = await models.Users.findOne({
      where: sequelize.where(
          sequelize.fn('lower', sequelize.col('name')),
          sequelize.fn('lower', name)
      )
  })
  console.log(persistedUser)
  if (persistedUser == null) {
      bcrypt.hash(password, salt, async (error, hash) => {
          if (error) {
              res.json({ message: "Something Went Wrong!!!" })
          } else {
              const user = models.Users.build({
                  name: name,
                  password: hash,
                  isLoggedIn: false,
              })

              let savedUser = await user.save()
              if (savedUser != null) {
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

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});