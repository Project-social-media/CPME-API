//
//
// --------------------------------------------
// Import
// --------------------------------------------
//
//

const mongoose = require('mongoose');

//
//
// --------------------------------------------
// Require
// --------------------------------------------
//
//

require('dotenv').config();

//
//
// --------------------------------------------
// Variables and Constants
// --------------------------------------------
//
//

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

//
//
// --------------------------------------------
// Database configuration
// --------------------------------------------
//
//

mongoose
	.connect(`mongodb+srv://${username}:${password}@cpmedb.mtbbrwo.mongodb.net/?retryWrites=true&w=majority`)
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.log('Error connecting to MongoDB', err));

module.exports = { mongoose };
