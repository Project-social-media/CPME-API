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

// Retrieve facebook post stats
router.get('/facebook/post/:id_post', statsController.getFacebookPostStats);

//Retrieve facebook page stats
router.get('/facebook/page', statsController.getFacebookPageStats);

// //Retrieve instagram post stats
router.get('/instagram/post/:id_post', statsController.getInstagramPostStats);

//Retrieve instagram page stats
router.get('/instagram/page', statsController.getInstagramPageStats);

module.exports = router;