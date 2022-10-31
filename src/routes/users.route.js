module.exports = (app) => {
	//
	//
	// --------------------------------------------
	// Require
	// --------------------------------------------
	//
	//

	const imp = require(`${appRoot}/server`);
	const usersController = require(`${appRoot}/src/controllers/users.controller`);
	const router = imp.express.Router();

	const test = require(`${appRoot}/src/scripts/test`);

	//
	//
	// --------------------------------------------
	// Routes
	// --------------------------------------------
	//
	//

	// Retrieve all users
	router.get('/', test, usersController.getAll);

	// Retrieve a single user with id
	router.get('/:id', usersController.getById);

	// Create a new user
	router.post('/create', usersController.create);

	// Update a user with id
	router.put('/update/:id', usersController.update);

	// Delete a user with id
	router.delete('/delete/:id', usersController.delete);

	app.use('/api/users', router);
};
