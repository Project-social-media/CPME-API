const express = require('express');
const cors = require('cors');
const path = require('path');
global.appRoot = path.resolve(__dirname);
const authentificationController = require(`${appRoot}/src/controllers/authentification.controller`);

require('dotenv').config();
require('./src/config/databases/mongodb.config');
require('./src/scripts/auto-post');

// Set host and port
const host = process.env.SERVER_HOST || '127.0.0.1';
const port = process.env.SERVER_PORT || 3101;

// Create and configure the express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Load routes and use authentication middleware
const usersRoute = require(path.resolve(__dirname, 'src/routes/users.route'));
const authentificationRoute = require(path.resolve(__dirname, 'src/routes/authentification.route'));
const postsRoute = require(path.resolve(__dirname, 'src/routes/posts.route'));
const statsRoute = require(path.resolve(__dirname, 'src/routes/stats.route'));
const archivesRoute = require(path.resolve(__dirname, 'src/routes/archives.route'));

app.use('/api/users', usersRoute);
app.use('/api/auth', authentificationRoute);
app.use('/api/posts', postsRoute);
app.use('/api/stats', statsRoute);
app.use('/api/archives', archivesRoute)

// Start the server
app.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}/`);
});