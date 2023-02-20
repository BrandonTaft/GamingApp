
    const users = require("../controllers/user.controller.js");
  
    router = require("express").Router();
  
    // Register a new User
    router.post('/register', users.createRegisteredUser);
  
    // User Login
    router.post('/login', users.findRegisteredUser);

    // Retrieve all comments by a user
    router.get("/user-comments/:id", users.findUserComments);

    // Update a Password with user id
    router.put("/user-update/:id", users.updateUserPassword);
    
    // Retrieve all logged in users
    router.get("/users", users.findAllLoggedInUsers);
  
    // Retrieve a single User with id
    router.get("/profile/:id", users.findUserById);
  
    // Delete a User with id
    router.delete("/profile/:id", users.deleteUser);
  
    module.exports = router