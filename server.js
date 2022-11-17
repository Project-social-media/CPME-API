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
var { getTweetStats } = require(`${appRoot}/src/scripts/twitter-api.js`);

const authentificationController = require(`${appRoot}/src/controllers/authentification.controller`);

//
//
// --------------------------------------------
// Require
// --------------------------------------------
//
//

// require(`${appRoot}/src/scripts/autoPost`);
require('./src/config/databases/mongodb.config');
require('dotenv').config();
require('./src/scripts/auto-post');

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
// Routes controllers
// --------------------------------------------
//
//

const usersRoute = require(`${appRoot}/src/routes/users.route`);
const authentificationRoute = require(`${appRoot}/src/routes/authentification.route`);
const postsRoute = require(`${appRoot}/src/routes/posts.route`);

app.use('/api/users', authentificationController.authRequest, usersRoute);
app.use('/api/auth', authentificationRoute);
app.use('/api/posts', authentificationController.authRequest, postsRoute);

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

getTweetStats('1592958929197113344');
