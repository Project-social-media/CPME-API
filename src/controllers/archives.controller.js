//
//
// --------------------------------------------
// Import
// --------------------------------------------
//
//

const archiveModel = require(`${appRoot}/src/models/mongoDB/archives.model`);
const sendError = require(`${appRoot}/src/scripts/send-error`);

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
		const archives = await archiveModel.model.find();
		return res.json(archives);
	} catch (err) {
		return sendError(_req, res, 500, err.message);
	}
};

// Get a post with id
exports.getById = async (req, res) => {
	try {
		const archives = await archiveModel.model.findById(req.params.id);
		res.json(archives);
	} catch (err) {
		return sendError(req, res, 500, err.message);
	}
};

// Create a new post
exports.create = async (req, res) => {
	const archives = new archiveModel.model(req.body);
	try {
		const newArchive = await archives.save();
		return res.status(201).json(newArchive);
	} catch (err) {
		return sendError(req, res, 400, err.message);
	}
};

// Update a post with id
exports.update = async (req, res) => {
	try {
		archiveModel.model.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, archive) => {
			if (err) return sendError(req, res, 500, err.message);

			return res.status(200).json(archive);
		});
	} catch (err) {
		return sendError(req, res, 500, err.message);
	}
};

// Delete a post with id
exports.delete = async (req, res) => {
	try {
		await archiveModel.model.findByIdAndDelete(req.params.id);
		return res.json({ message: 'Archive deleted' });
	} catch (err) {
		return sendError(req, res, 500, err.message);
	}
};
