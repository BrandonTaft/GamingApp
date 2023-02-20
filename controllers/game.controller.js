const db = require("../models");
const User = db.users;
const Comment = db.comments;
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
