const express = require('express');
const router = express.Router();
const statsController = require(`${appRoot}/src/controllers/stats.controller`);

router
    .get('/twitter/user/:id_user', statsController.getTwittosStats)
    .get('/twitter/tweet', statsController.getTweetStats)
    .get('/facebook/post', statsController.getFacebookPostStats)
    .get('/facebook/page', statsController.getFacebookPageStats)
    .get('/instagram/post', statsController.getInstagramPostStats)
    .get('/instagram/page', statsController.getInstagramPageStats);

module.exports = router;