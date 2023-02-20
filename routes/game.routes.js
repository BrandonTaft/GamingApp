const games = require("../controllers/comment.controller.js");
  
    router = require("express").Router();
    
    // Create A Game
    router.post('/add-game:game-id', games.createComment);

    // Retrieve all games by gameId
    router.get("/games/:id", games.findAllGamesById);
  
    module.exports = router