const db = require("../models");
const User = db.users;
const Comment = db.comments;
const Op = db.Sequelize.Op;
const sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = 10;



// // Get comments posted by given user
// exports.findUserComments = (req, res) => {
//     const userId = req.params.id;
//     return User.findByPk(userId, { include: ["comments"] })
//         .then((user) => {
//             res.json(user);
//         })
//         .catch((err) => {
//             console.log(">> Error while finding user: ", err);
//         });
// };



exports.createComment = (req, res) => {
    return Comment.create({
        text: req.body.comment,
        game: req.body.game,
        gameId: parseInt(req.params.gameId),
        name: req.body.user,
        userId: parseInt(req.body.userId),
    })
        .then((comment) => {
            console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
            res.json({ success: true })
        })
        .catch((err) => {
            console.log(">> Error while creating comment: ", err);
        });
};

//Get the comments for a given user id
exports.findAllCommentsByGameId = (req, res) => {
    console.log()
    return Comment.findAll({
        where: {
            gameId: req.params.id,
        }
    })
        .then((comment) => {
            console.log(comment)
            res.json(comment)
        })
        .catch((err) => {
            console.log(">> Error while finding comment: ", err);
        });
};