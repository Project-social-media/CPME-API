//
//
// --------------------------------------------
// Import
// --------------------------------------------
//
//

const bcrypt = require('bcrypt');
const userModel = require(`${appRoot}/src/models/mongoDB/users.model`);

//
//
// --------------------------------------------
// Route controllers
// --------------------------------------------
//
//

// Get all users
exports.getAll = async (_req, res) => {
	try {
		const users = await userModel.model.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Get a user with id
exports.getById = async (req, res) => {
	try {
		const user = await userModel.model.findById(req.params.id);
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Create a new user
exports.create = async (req, res) => {
	const user = new userModel.model({
		username: req.body.username,
		password: await bcrypt.hash(req.body.password, 10),
	});

	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// Update a user with id
exports.update = async (req, res) => {
	try {
		const user = await userModel.model.findById(req.params.id);

		if (req.body.username != null) {
			user.username = req.body.username;
		}

		if (req.body.password != null) {
			user.password = await bcrypt.hash(req.body.password, 10);
		}

		const updatedUser = await user.save();
		res.json(updatedUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// Delete a user with id
exports.delete = async (req, res) => {
	try {
		await userModel.model.findByIdAndDelete(req.params.id);
		res.json({ message: 'User deleted' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
