const comments = require("../controllers/comment.controller.js");
  
    router = require("express").Router();
    
    // Create A Comment
    router.post('/addcomment:gameId', comments.createComment);

    // Retrieve all comments by gameId
    router.get("/comments/:id", comments.findAllCommentsByGameId);

    // // Retrieve all comments made by a user
    // router.get("/my-comments/:id", comments.findUserComments);
  
    module.exports = router