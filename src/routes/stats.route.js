//
//
// --------------------------------------------
// Require
// --------------------------------------------
//
//

const express = require('express');
const router = express.Router();
const statsController = require(`${appRoot}/src/controllers/stats.controller`);

//
//
// --------------------------------------------
// Routes
// --------------------------------------------
//
//

// Retrieve user stats
router.get('/twitter/user/:id_user', statsController.getTwittosStats);

// Retrieve tweet stats
router.get('/twitter/tweet/:id_tweet', statsController.getTweetStats);

module.exports = router;