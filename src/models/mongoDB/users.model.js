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

var userSchema = new mongoDb.mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

var model = mongoDb.mongoose.model('users', userSchema);

//
//
// --------------------------------------------
// Export
// --------------------------------------------
//
//

module.exports = { model };
