const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require(`${appRoot}/src/models/mongoDB/users.model`);
const sendError = require(`${appRoot}/src/scripts/send-error`);

/* A function that logs in a user. */
exports.login = async (req, res) => {
	try {
		const user = await userModel.model.findOne({ username: req.body.username });

		if (!user) return sendError(req, res, 400, 'Wrong username or password');
		if (!(await bcrypt.compare(req.body.password, user.password))) return sendError(req, res, 400, 'Wrong username or password');

		const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '90d' });
		res.append("authorization", accessToken);
		return res.json({ 'accessToken': accessToken, 'username': user.username, 'id': user._id, 'email': user.email });
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
