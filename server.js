const express = require('express');
const app = express();
const path = require('path');
const db = require("./models");
const cors = require('cors');
var corsOptions = {
    origin: "http://localhost:3000"
};
const userRouter = require('./routes/user.routes');
const commentRouter = require('./routes/comment.routes');
const igdbRouter = require('./routes/igdb.routes');

app.use(cors(corsOptions));
app.use(express.json({ limit: 52428800 }));
app.use(express.urlencoded({ extended: true, limit: 52428800 }));
//app.use(express.static(path.resolve(__dirname, './client/build')));

const PORT = process.env.PORT || 3001;


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

app.use('/api', userRouter, commentRouter)
app.use('/igdb', igdbRouter)

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
// });

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});