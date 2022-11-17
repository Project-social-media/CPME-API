//
//
// --------------------------------------------
// Require
// --------------------------------------------
//
//

const mongoDb = require(`${appRoot}/src/config/databases/mongodb.config`);

//
//
// --------------------------------------------
// Model
// --------------------------------------------
//
//

var archiveSchema = new mongoDb.mongoose.Schema({
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
	facebook: {
		type: Boolean,
		required: false,
		default: false,
	},
	twitter: {
		type: Boolean,
		required: false,
		default: false,
	},
	instagram: {
		type: Boolean,
		required: false,
		default: false,
	},
	linkedin: {
		type: Boolean,
		required: false,
		default: false,
	},
	idMessagePost: {
		type: String,
		required: false,
	},
	state: {
		type: String,
		required: false,
		default: 'Archived',
	},
});

var model = mongoDb.mongoose.model('posts', archiveSchema);

//
//
// --------------------------------------------
// Export
// --------------------------------------------
//
//

module.exports = { model };
