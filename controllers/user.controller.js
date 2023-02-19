const db = require("../models");
const User = db.users;
const Comment = db.comments;
const Op = db.Sequelize.Op;
const sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = 10;


function findUserByName(name) {
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

exports.createRegisteredUser = async (req, res) => {
    const name = req.body.name
    const password = req.body.password
    const persistedUser = await findUserByName(name)
    if (persistedUser === null) {
        bcrypt.hash(password, salt, async (error, hash) => {
            if (error) {
                res.json({ message: "Something Went Wrong! Please Try Again" })
            } else {
                const user = await User.create({
                    name: name,
                    password: hash,
                    isLoggedIn: false,
                });
                if (user !== null) {
                    res.json({ success: true })
                }
            }
        })
    } else {
        res.json({ message: " Sorry This UserName Already Exists" })
    }
}

exports.findRegisteredUser = async (req, res) => {
    const name = req.body.name
    const password = req.body.password
    let user = await findUserByName(name)
    if (user != null) {
        bcrypt.compare(password, user.password, (error, result) => {
            if (result) {
                User.update(
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
}

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

// exports.updateUser = (userId) => {
//     return User.update
// }

exports.findAllUsers = () => {
    return User.findAll({
        include: ["comments"],
    }).then((users) => {
        return users;
    });
};


//Get the comments for a given user id
exports.findAllCommentsByUserId = (id) => {
    return Comment.findByPk(id, { include: ["user"] })
        .then((comment) => {
            return comment;
        })
        .catch((err) => {
            console.log(">> Error while finding comment: ", err);
        });
};