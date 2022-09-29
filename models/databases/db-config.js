// ============================================
// Import
// ============================================

const mongoose = require('mongoose');
require('dotenv').config();



// ============================================
// Database configuration
// ============================================

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cpmedb.mtbbrwo.mongodb.net/?retryWrites=true&w=majority`).then(() => console.log('Database connected'));


db = mongoose.connection;