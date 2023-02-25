const db = require("../models");
const User = db.users;
const Comment = db.comments;
const Game = db.games;
const Op = db.Sequelize.Op;
const sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = 10;


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

exports.createGame = (game) => {
    return Game.create({
        name: game.name,
        cover: game.cover.url,
        genres: game.genres,
        follows: game.follows,
        platforms: game.platforms,
        url: game.url,
        summary: game.summary,
        release_date: game.first_release_date,
        rating: game.total_rating,
        rating_count: game.total_rating_count
    })
        .then((game) => {
            console.log(">> Created Game: " + JSON.stringify(game.name, null, 4));
            // res.json({ success: true })
        })
        .catch((err) => {
            console.log(">> Error while creating game: ", err);
            // res.json({ message:">> Error while creating game: " });
        });
};
