const { authRequest } = require('../controllers/authentification.controller');

const router = require('express').Router();
const { getAll, getById, getByMail, getByIdInJwtToken, create, update, deleteD } = require(`${appRoot}/src/controllers/users.controller`);

router
    .get('/all', authRequest, getAll)
    .get('/id/:id', authRequest, getById)
    .get('/email/:email', authRequest, getByMail)
    .get('/me', authRequest, getByIdInJwtToken)
    .post('/create', authRequest, create)
    .put('/update/:email', update)
    .delete('/delete/:id', authRequest, deleteD);

module.exports = router;
