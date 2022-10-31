//
//
// --------------------------------------------
// Import
// --------------------------------------------
//
//

const express = require('express');
const cors = require('cors');

var path = require('path');
global.appRoot = path.resolve(__dirname);

//
//
// --------------------------------------------
// Require
// --------------------------------------------
//
//

require(`${appRoot}/src/scripts/autoPost`);
require('./src/config/databases/mongodb.config');
require('dotenv').config();

//
//
// --------------------------------------------
// Variables and Constants
// --------------------------------------------
//
//

const host = process.env.SERVER_HOST || 'localhost';
const port = process.env.SERVER_PORT || 3000;

//
//
// --------------------------------------------
// Express configuration
// --------------------------------------------
//
//

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
//
// --------------------------------------------
// Cors configuration
// --------------------------------------------
//
//

app.use(cors());

//
//
// --------------------------------------------
// Server listening
// --------------------------------------------
//
//

app.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}/`);
});

//
//
// --------------------------------------------
// Export
// --------------------------------------------
//
//

module.exports = { express };

//
//
// --------------------------------------------
// Routes controllers
// --------------------------------------------
//
//

require('./src/routes/users.route')(app);
require('./src/routes/posts.route')(app);
