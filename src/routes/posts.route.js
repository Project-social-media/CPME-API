//
//
// --------------------------------------------
// Require
// --------------------------------------------
//
//

const express = require('express');
const router = express.Router();
const postsController = require(`${appRoot}/src/controllers/posts.controller`);

//
//
// --------------------------------------------
// Routes
// --------------------------------------------
//
//

// Retrieve all users
router.get('/', postsController.getAll);

// Retrieve a single user with id
router.get('/:id', postsController.getById);

// Create a new user
router.post('/create', postsController.create);

// Update a user with id
router.put('/update/:id', postsController.update);

// Delete a user with id
router.delete('/delete/:id', postsController.delete);

module.exports = router;
