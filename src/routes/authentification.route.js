module.exports = (app) => {
	//
	//
	// --------------------------------------------
	// Require
	// --------------------------------------------
	//
	//

	const imp = require(`${appRoot}/server`);
	const authentificationController = require(`${appRoot}/src/controllers/authentification.controller`);
	const router = imp.express.Router();

	//
	//
	// --------------------------------------------
	// Routes
	// --------------------------------------------
	//
	//

	// Login user
	router.post('/login', authentificationController.login);

	// Check token
	router.post('/check-token', authentificationController.checkToken);

	app.use('/api/auth', router);
};
