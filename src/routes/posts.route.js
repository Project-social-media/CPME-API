module.exports = (app) => {
	//
	//
	// --------------------------------------------
	// Require
	// --------------------------------------------
	//
	//

	const imp = require(`${appRoot}/server`);
	const postsController = require(`${appRoot}/src/controllers/posts.controller`);
	const router = imp.express.Router();

	//
	//
	// --------------------------------------------
	// Routes
	// --------------------------------------------
	//
	//

	// Retrieve all users
	router.get('/', postsController.getAll);

	// Retrieve a single user with id
	router.get('/:id', postsController.getById);

	// Create a new user
	router.post('/create', postsController.create);

	// Update a user with id
	router.put('/update/:id', postsController.update);

	// Delete a user with id
	router.delete('/delete/:id', postsController.delete);

	app.use('/api/posts', router);
};
