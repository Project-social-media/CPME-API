const bcrypt = require('bcrypt');
const userModel = require(`${appRoot}/src/models/mongoDB/users.model`);
const sendError = require(`${appRoot}/src/scripts/send-error`);
const jwt = require('jsonwebtoken');

// Get all users
exports.getAll = async (req, res) => {
	try {
		const users = await userModel.model.find();
		res.status(200).json(users);
	} catch (err) {
		sendError(req, res, 500, err.message);
	}
};

// Get a user with id
exports.getById = async (req, res) => {
	try {
		const user = await userModel.model.findById(req.params.id);
		res.json(user);
	} catch (err) {
		sendError(req, res, 500, err.message);
	}
};

exports.getByIdInJwtToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const userId = jwt.decode(token).id;
		const user = await userModel.model.findById(userId);
		res.json(user);
	} catch (err) {
		sendError(req, res, 500, err.message);
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
		sendError(req, res, 400, err.message);
	}
};

// Update a user with id
exports.update = async (req, res) => {
	try {
		const user = await userModel.model.findById(req.params.id);

		if (req.body.username != null) user.username = req.body.username;

		if (req.body.password != null) user.password = await bcrypt.hash(req.body.password, 10);

		const updatedUser = await user.save();
		res.json(updatedUser);
	} catch (err) {
		sendError(req, res, 400, err.message);
	}
};

// Delete a user with id
exports.deleteD = async (req, res) => {
	try {
		await userModel.model.findByIdAndDelete(req.params.id);
		res.json({ message: 'User deleted' });
	} catch (err) {
		sendError(req, res, 500, err.message);
	}
};