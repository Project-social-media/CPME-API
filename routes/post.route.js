// ============================================
// Import
// ============================================

const express = require('express');
const { PostModel } = require('../models/collections/post.model.js');
require('dotenv').config();




// ============================================
// Variables and Constants
// ============================================

const router = express.Router();




// ===========================================
// Routes controllers
// ===========================================

// Get all posts route //

router.get('/', (_req, res) => {
    PostModel.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});




// Get post by ID route //

router.get('/:id', (req, res) => {
    PostModel.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});




// Create post route //

router.post('/', (req, res) => {
    const newPostReq = new PostModel(req.body);

    newPostReq.save((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});



// Update post route //

router.put('/:id', (req, res) => {
    PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});




// Delete post route //

router.delete('/:id', (req, res) => {
    PostModel.findByIdAndDelete(req.params.id, (err, data) => {
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