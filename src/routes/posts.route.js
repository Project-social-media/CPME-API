const express = require('express');
const router = express.Router();
const postsController = require(`${appRoot}/src/controllers/posts.controller`);

router
    .get('/', postsController.getAll)
    .get('/:id', postsController.getById)
    .post('/create', postsController.create)
    .put('/update/:id', postsController.update)
    .delete('/delete/:id', postsController.delete);

module.exports = router;