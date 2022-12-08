const express = require('express');
const router = express.Router();
const authentificationController = require(`${appRoot}/src/controllers/authentification.controller`);

router
    .post('/login', authentificationController.login);

module.exports = router;