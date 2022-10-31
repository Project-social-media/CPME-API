//
//
// --------------------------------------------
// Import
// --------------------------------------------
//
//

const postModel = require(`${appRoot}/src/models/mongoDB/posts.model`);

//
//
// --------------------------------------------
// Route controllers
// --------------------------------------------
//
//

// Get all post
exports.getAll = async (_req, res) => {
	try {
		const posts = await postModel.model.find();
		res.json(posts);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Get a post with id
exports.getById = async (req, res) => {
	try {
		const post = await postModel.model.findById(req.params.id);
		res.json(post);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Create a new post
exports.create = async (req, res) => {
	const post = new postModel.model(req.body);
	try {
		const newPost = await post.save();
		res.status(201).json(newPost);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// Update a post with id
exports.update = async (req, res) => {
	try {
		postModel.model.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, post) => {
			if (err) {
				res.status(500).json({ message: err.message });
			} else {
				res.status(200).json(post);
			}
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Delete a post with id
exports.delete = async (req, res) => {
	try {
		await postModel.model.findByIdAndDelete(req.params.id);
		res.json({ message: 'Post deleted' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
