// ============================================
// Import
// ============================================

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ============================================
// Model
// ============================================

const PostsModel = new Schema({
    message: {
        type: String,
        required: true,
    },
    media: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
        default: Date.now,
    },
    facebook: {
        type: Boolean,
        required: false,
        default: false,
    },
    twitter: {
        type: Boolean,
        required: false,
        default: false,
    },
    instagram: {
        type: Boolean,
        required: false,
        default: false,
    },
    linkedin: {
        type: Boolean,
        required: false,
        default: false,
    },
});


var PostModel = mongoose.model('post', PostsModel);




// ===========================================
// Export
// ===========================================

module.exports = { PostModel };