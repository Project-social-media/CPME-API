//
//
// --------------------------------------------
// Import
// --------------------------------------------
//
//

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require(`${appRoot}/src/models/mongoDB/users.model`);
const sendError = require(`${appRoot}/src/scripts/send-error`);

//
//
// --------------------------------------------
// Route controllers
// --------------------------------------------
//
//

/* A function that is called when a user logs in. It checks if the user exists and if the
password is correct. If it is correct, it creates a token and sends it to the user. */
exports.login = async (req, res) => {
	try {
		const user = await userModel.model.findOne({ username: req.body.username });
		if (user == null) return sendError(req, res, 400, 'Wrong username or password');

		try {
			if (!bcrypt.compare(req.body.password, user.password)) return sendError(req, res, 400, 'Wrong username or password');

			const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
			return res.json({ accessToken: accessToken });
		} catch (err) {
			return sendError(req, res, 500, err.message);
		}
	} catch (err) {
		return sendError(req, res, 500, err.message);
	}
};

/* A middleware function that checks if the user is logged in. */
exports.authRequest = async (req, res, next) => {
	try {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		if (token == null) return sendError(req, res, 401, 'No token provided');

		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
			//
			if (err) return sendError(req, res, 403, err);
			next();
			//
		});
	} catch (err) {
		return sendError(req, res, 500, err.message);
	}
};
