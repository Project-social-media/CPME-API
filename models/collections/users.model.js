// ============================================
// Import
// ============================================

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ============================================
// Model
// ============================================

const UsersModel = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});


var UserModel = mongoose.model('users', UsersModel);




// ===========================================
// Export
// ===========================================

module.exports = { UserModel };