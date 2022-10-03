// ============================================
// Import
// ============================================

const mongoose = require('mongoose');
var Schema = mongoose.Schema;




// ============================================
// Model
// ============================================

const SubmittedPostsModel = new Schema({
    id: {
        type: String,
        required: true,
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


var SubmittedPostModel = mongoose.model('post', SubmittedPostsModel);




// ===========================================
// Export
// ===========================================

module.exports = { SubmittedPostModel };