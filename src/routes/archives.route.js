const express = require('express');
const router = express.Router();
const archivesController = require(`${appRoot}/src/controllers/archives.controller`);

router
    .get('/', archivesController.getAll)
    .get('/:id', archivesController.getById)
    .post('/create', archivesController.create)
    .put('/update/:id', archivesController.update)
    .delete('/delete/:id', archivesController.delete);

module.exports = router;