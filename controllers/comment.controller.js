const db = require("../models");
const Comment = db.comments;

exports.createComment = (req, res) => {
    return Comment.create({
        text: req.body.comment,
        game: req.body.game,
        gameId: req.body.gameId,
        name: req.body.user,
        userId: parseInt(req.body.userId),
    })
        .then((comment) => {
            console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
            res.json({ success: true })
        })
        .catch((err) => {
            console.log(">> Error while creating comment: ", err);
            res.json({ message:">> Error while creating comment: " });
        });
};

//Get the comments for a given user id
exports.findAllCommentsByGameId = (req, res) => {
    return Comment.findAll({
        where: {
            gameId: req.params.id,
        }
    })
        .then((comment) => {
            res.json(comment)
        })
        .catch(err => {
            console.log(err || "Some error occurred while retrieving comments.")
            res.json({ message: "Some error occurred while retrieving comments." });
          });
};

//Get the comments for a given user id
exports.findAllCommentsByUserId = (req, res) => {
    return Comment.findByPk(id, { include: ["user"] })
        .then((comments) => {
            res.json(comments)
        })
        .catch((err) => {
            console.log(">> Error while finding comment: ", err);
            res.json({ message: ">> Error while finding comment: " });
        });
};

exports.deleteCommentById = (req, res) => {
    Comment.destroy({
        where : {
            id: req.params.id
        }
    })
    .then(num => {
        console.log(num)
        if (num == 1) {
          res.json({ message: "Comment was deleted successfully!" });
        } else {
          res.json({ message: 'Comment was not found!' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Could not delete Comment" });
      });
}