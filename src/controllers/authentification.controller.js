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

//
//
// --------------------------------------------
// Route controllers
// --------------------------------------------
//
//

// Get all post
exports.login = async (req, res) => {
	try {
		const user = await userModel.model.findOne({ username: req.body.username });

		if (user == null) return res.status(400).send('Cannot find user');

		try {
			if (await bcrypt.compare(req.body.password, user.password)) {
				// Create token with lifespan of 1 hour
				const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
				console.log(accessToken);
				res.json({ accessToken: accessToken });
			} else {
				res.send('Not Allowed');
			}
		} catch {
			res.status(500).send();
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.checkToken = async (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		res.json(user);
		next();
	});
};

exports.authRequest = async (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		next();
	});
};
