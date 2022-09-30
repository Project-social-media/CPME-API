// ============================================
// Import
// ============================================

const express = require('express');
const { UserModel } = require('../models/collections/users.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();




// ============================================
// Variables and Constants
// ============================================

const router = express.Router();




// ===========================================
// Routes controllers
// ===========================================


// Get all user route //

router.get('/', (_req, res) => {
    UserModel.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});




// Get user by ID route //

router.get('/:id', (req, res) => {
    UserModel.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});




// Create user route //

router.post('/', (req, res) => {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;

    const newUser = new UserModel({
        username: username,
        password: bcrypt.hashSync(password, 10)
    });

    newUser.save((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});




// Update user route //

router.put('/:id', (req, res) => {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;

    UserModel.findByIdAndUpdate(req.params.id, {
        username: username,
        password: bcrypt.hashSync(password, 10)
    }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});




// Delete user route //

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    UserModel.findByIdAndRemove(id, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});



// ===========================================
// Export
// ===========================================

module.exports = router;