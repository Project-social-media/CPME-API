const postModel = require(`${appRoot}/src/models/mongoDB/posts.model`);
const sendError = require(`${appRoot}/src/scripts/send-error`);


// Get all post
exports.getAll = async (_req, res) => {
	try {
		const posts = await postModel.model.find();
		return res.json(posts);
	} catch (err) {
		return sendError(_req, res, 500, err.message);
	}
};

// Get a post with id
exports.getById = async (req, res) => {
	try {
		const post = await postModel.model.findById(req.params.id);
		res.json(post);
	} catch (err) {
		return sendError(req, res, 500, err.message);
	}
};


// Get a post with date
exports.getAllPostsByDayDate = async (req, res) => {
	dayDate = new Date(req.body.date);
	dayDate.setHours(0, 0, 0, 0);

	try {
		const posts = await postModel.model.find({ date: { $gte: dayDate } });
		res.json(posts);
	} catch (err) {
		return sendError(req, res, 500, err.message);
	}
};

// Create a new post
exports.create = async (req, res) => {
	const post = new postModel.model(req.body);
	try {
		const newPost = await post.save();
		return res.status(201).json(newPost);
	} catch (err) {
		return sendError(req, res, 400, err.message);
	}
};

// Update a post with id
exports.update = async (req, res) => {
	try {
		postModel.model.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, post) => {
			if (err) return sendError(req, res, 500, err.message);

			return res.status(200).json(post);
		});
	} catch (err) {
		return sendError(req, res, 500, err.message);
	}
};

// Delete a post with id
exports.delete = async (req, res) => {
	try {
		await postModel.model.findByIdAndDelete(req.params.id);
		return res.json({ message: 'Post deleted' });
	} catch (err) {
		return sendError(req, res, 500, err.message);
	}
};
