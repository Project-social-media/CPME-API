//
//
// --------------------------------------------
// Require
// --------------------------------------------
//
//

const express = require('express');
const router = express.Router();
const authentificationController = require(`${appRoot}/src/controllers/authentification.controller`);

//
//
// --------------------------------------------
// Routes
// --------------------------------------------
//
//

// Login user
router.post('/login', authentificationController.login);

module.exports = router;
