const db = require("../models");
const User = db.users;
const Game = db.games;


exports.getAllGames = (req, res) => {
    console.log("I RAN AGAIN!!!")
    return Game.findAll()
        .then((games) => {
            res.json(games)
        })
        .catch((err) => {
            console.log(">> Error while getting games: ", err);
        });
};

exports.findGameById = (req, res) => {
    const gameId = req.params.gameId
    console.log(gameId)
    return Game.findOne({
        where: {
            igdb_id: gameId
        }
    })
        .then((game) => {
            res.json(game)
        })
        .catch((err) => {
            console.log(">> Error while finding game: ", err);
        });
};

exports.createGame = async (game) => {
    const existingGame = await findGameById(game.id);
    if (existingGame === null) {
        return Game.create({
            igdb_id: game.id,
            name: game.name,
            genres: game.genres,
            follows: game.follows,
            platforms: game.platforms,
            summary: game.summary,
            release_date: game.first_release_date,
            rating: game.total_rating,
            rating_count: game.total_rating_count,
            ...(game.url && { url: game.url }),
            ...(game.cover && { cover: game.cover.image_id }),
            ...(game.videos && { videos: game.videos[0].video_id }),
        })
            .then((game) => {
                console.log(">> Created Game: " + JSON.stringify(game.name, null, 4));
               // res.json({ success: true })
            })
            .catch((err) => {
                console.log(">> Error while creating game: ", err);
               // res.json({ message: ">> Error while creating game: " });
            });
    } else return
};

// Get comments posted by given user
exports.findUserComments = (req, res) => {
    const userId = req.params.id;
    return User.findByPk(userId, { include: ["comments"] })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(">> Error while finding user: ", err);
        });
};