//
//
// --------------------------------------------
// Require
// --------------------------------------------
//
//

const express = require('express');
const router = express.Router();
const usersController = require(`${appRoot}/src/controllers/users.controller`);

//
//
// --------------------------------------------
// Routes
// --------------------------------------------
//
//

// Retrieve all users
router.get('/', usersController.getAll);

// Retrieve a single user with id
router.get('/id/:id', usersController.getById);

// Get user from jwt token
router.get('/getByIdInJwtToken', usersController.getByIdInJwtToken);

// Create a new user
router.post('/create', usersController.create);

// Update a user with id
router.put('/update/:id', usersController.update);

// Delete a user with id
router.delete('/delete/:id', usersController.delete);

module.exports = router;
