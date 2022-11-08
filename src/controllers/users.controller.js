//
//
// --------------------------------------------
// Import
// --------------------------------------------
//
//

const bcrypt = require('bcrypt');
const userModel = require(`${appRoot}/src/models/mongoDB/users.model`);
const sendError = require(`${appRoot}/src/scripts/send-error`);
const jwt = require('jsonwebtoken');

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
		return res.status(200).json(users);
	} catch (err) {
		return sendError(_req, res, 500, err.message);
	}
};

// Get a user with id
exports.getById = async (req, res) => {
	try {
		const user = await userModel.model.findById(req.params.id);
		return res.json(user);
	} catch (err) {
		return sendError(req, res, 500, err.message);
	}
};

exports.getByIdInJwtToken = async (req, res, next) => {
	const token = req.headers['authorization'].split(' ')[1];
	const userId = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	try {
		const user = await userModel.model.findById(userId);
		return res.json(user);
	} catch (err) {
		return sendError(req, res, 500, err.message);
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
		return res.status(201).json(newUser);
	} catch (err) {
		return sendError(req, res, 400, err.message);
	}
};

// Update a user with id
exports.update = async (req, res) => {
	try {
		const user = await userModel.model.findById(req.params.id);

		if (req.body.username != null) user.username = req.body.username;

		if (req.body.password != null) user.password = await bcrypt.hash(req.body.password, 10);

		const updatedUser = await user.save();
		return res.json(updatedUser);
	} catch (err) {
		return sendError(req, res, 400, err.message);
	}
};

// Delete a user with id
exports.delete = async (req, res) => {
	try {
		await userModel.model.findByIdAndDelete(req.params.id);
		return res.json({ message: 'User deleted' });
	} catch (err) {
		return sendError(req, res, 500, err.message);
	}
};
