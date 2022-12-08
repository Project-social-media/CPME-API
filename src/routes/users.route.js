const router = require('express').Router();
const { getAll, getById, getByIdInJwtToken, create, update, deleteD } = require(`${appRoot}/src/controllers/users.controller`);

router
    .get('/all', getAll)
    .get('/id/:id', getById)
    .get('/me', getByIdInJwtToken)
    .post('/create', create)
    .put('/update/:id', update)
    .delete('/delete/:id', deleteD);

module.exports = router;