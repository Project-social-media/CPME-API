const router = require('express').Router();
const { getAll, getById, getByIdInJwtToken, create, update, deleteD } = require(`${appRoot}/src/controllers/users.controller`);

router
    .get('/', getAll)
    .get('/:id', getById)
    .get('/me', getByIdInJwtToken)
    .post('/', create)
    .put('/:id', update)
    .delete('/:id', deleteD);

module.exports = router;