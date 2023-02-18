const db = require("../models");
const User = db.users;
const Comment = db.comments;
const sequelize = require('sequelize');

//create and save new user
exports.createUser = (user) => {
    return User.create({
        name: user.name,
        password: user.password,
        email: user.email,
        profilePic: user.profilePic,
        isLoggedIn: user.isLoggedIn
    })
        .then((user) => {
            console.log(">> Created user: " + JSON.stringify(user, null, 4));
            return user;
        })
        .catch((err) => {
            console.log(">> Error while creating user: ", err);
        });
};

//Create and save new comments
exports.createComment = (userId, comment) => {
    return Comment.create({
        name: comment.name,
        text: comment.text,
        game: comment.game,
        gameId: comment.gameId,
        userId: userId,
    })
        .then((comment) => {
            console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
            return comment;
        })
        .catch((err) => {
            console.log(">> Error while creating comment: ", err);
        });
};

//Get all users
exports.findAll = () => {
    return User.findAll({
        include: ["comments"],
    }).then((users) => {
        return users;
    });
};

exports.findUserByName = (name) => {
    return User.findOne({
              where: sequelize.where(
                  sequelize.fn('lower', sequelize.col('name')),
                  sequelize.fn('lower', name)
              )
          })
        .then((user) => {
            return user;
        })
        .catch((err) => {
            console.log(">> Error while finding user: ", err);
        });
};


// Get comments posted by given user
exports.findUserById = (userId) => {
    return User.findByPk(userId, { include: ["comments"] })
        .then((user) => {
            return user;
        })
        .catch((err) => {
            console.log(">> Error while finding user: ", err);
        });
};

//Get the comments for a given comment id
exports.findCommentById = (id) => {
    return Comment.findByPk(id, { include: ["user"] })
        .then((comment) => {
            return comment;
        })
        .catch((err) => {
            console.log(">> Error while finding comment: ", err);
        });
};