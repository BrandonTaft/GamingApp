const path = require('path');
const express = require('express');
const sequelize = require('sequelize');
const models = require('./models');
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.static(path.resolve(__dirname, './client/build')));
// app.use(express.static(path.resolve(__dirname, './client')));

app.get("/api", (req, res) => {
  res.json({ message: "Hi There yo!" });
});

//***************************REGISTRATION PAGE***************************//

app.post('/api/register', async (req, res) => {
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

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
//   res.sendFile(path.resolve(__dirname, './client/', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});