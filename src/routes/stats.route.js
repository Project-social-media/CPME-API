const express = require('express');
const router = express.Router();
const statsController = require(`${appRoot}/src/controllers/stats.controller`);

router
    .get('/twitter', statsController.getTwitterUserStats)
    .get('/facebook/stats', statsController.getFacebookPageStats);

module.exports = router;