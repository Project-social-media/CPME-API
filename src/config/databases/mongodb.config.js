// Import mongoose
const mongoose = require('mongoose');

// Require dotenv
require('dotenv').config();

// Get MongoDB username and password from environment variables
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

// Connect to MongoDB using username and password
mongoose.connect(
	`mongodb+srv://${username}:${password}@cpmedb.mtbbrwo.mongodb.net/?retryWrites=true&w=majority`,
	{ useNewUrlParser: true, useUnifiedTopology: true }
)
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.log('Error connecting to MongoDB', err));

module.exports = { mongoose };
