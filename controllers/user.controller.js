const db = require("../models");
const User = db.users;
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
    const { name, password } = req.body
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
    const { name, password } = req.body
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
            console.log(">> Error while finding user comments: ", err);
            res.json({
                message: ">> Error while finding user comments: ", err
            });
        });
};

exports.updateUserPassword = (req, res) => {
    const id = req.params.id;
    const newPassword = req.body.newPassword
    console.log("req.body.password", req.body.newPassword)
    const password = newPassword ? newPassword : User.password
    bcrypt.hash(password, salt, async (error, hash) => {
        if (error) {
            res.json({ message: "Something Went Wrong! Please Try Again" })
        } else {
            return User.update(
                {
                    password: hash,
                },
                { where: { id: id } }
            ).then(num => {
                if (num == 1) { res.json({ message: "Password was updated successfully." });
                } else {
                  res.json({ message: 'Cannot update Password' });
                }
              })
              .catch(err => {
                res.status(500).json({ message: "Error updating Password" });
              });
        }
    })

}

exports.findAllLoggedInUsers = (req, res) => {
    return User.findAll({
        where: {
            isLoggedIn: true
        }
    }).then((users) => {
        res.json(users)
    });
};

exports.findUserById = (req, res) => {
    return User.findOne({
        where: {
            id: req.params.id
        }
    }).then((user) => {
        res.json(user)
    });
};

exports.deleteUser = (req, res) => {
    User.destroy({
      where: { id: req.params.id }
    })
      .then(num => {
        console.log(num)
        if (num == 1) {
          res.json({ message: "User was deleted successfully!" });
        } else {
          res.json({ message: 'User was not found!' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Could not delete User with id=" + id });
      });
  };