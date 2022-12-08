// Require MongoDB config
const { mongoose } = require(`${appRoot}/src/config/databases/mongodb.config`);

// Define archive schema
const archiveSchema = new mongoose.Schema({
	message: {
		type: String,
		required: true,
	},
	media: {
		type: String,
		required: false,
	},
	date: {
		type: Date,
		required: false,
		default: Date.now,
	},
	idMessageFacebook: {
		type: String,
		required: false,
	},
	idMessageTwitter: {
		type: String,
		required: false,
	},
	idMessageInstagram: {
		type: String,
		required: false,
	},
	idMessageLinkedin: {
		type: String,
		required: false,
	},
});

// Create model
const model = mongoose.model('archives', archiveSchema);

// Export model
module.exports = { model };
