const comments = require("../controllers/comment.controller.js");
  
    router = require("express").Router();
    
    // Create A Comment
    router.post('/addcomment', comments.createComment);

    // Retrieve all comments by gameId
    router.get("/comments/:id", comments.findAllCommentsByGameId);

    // Retrieve all comments by userId
    router.get("/comments/user/:id", comments.findAllCommentsByUserId);

    // Delete all comments by commentId
    router.delete("/comments/:id", comments.deleteCommentById);
  
    module.exports = router