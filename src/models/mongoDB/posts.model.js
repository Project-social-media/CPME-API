const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	message: {
		type: String,
		required: true,
	},
	media: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	facebook: {
		type: Boolean,
		default: false,
	},
	twitter: {
		type: Boolean,
		default: false,
	},
	instagram: {
		type: Boolean,
		default: false,
	},
	linkedin: {
		type: Boolean,
		default: false,
	},
});

const model = mongoose.model('posts', postSchema);

module.exports = { model };