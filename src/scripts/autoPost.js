//
//
// --------------------------------------------
// Require
// --------------------------------------------
//
//

const post = require(`${appRoot}/src/models/mongoDB/posts.model`);
const { postFacebook, postFacebookWithPicture } = require(`${appRoot}/src/scripts/facebookAPI`);
const { postTweet, postTweetWithPicture } = require(`${appRoot}/src/scripts/twitter`);
require('dotenv').config();

//
//
// --------------------------------------------
// Functions
// --------------------------------------------
//
//

// Delete post in database if the post date is older than now //

checkInterval = process.env.CHECK_INTERVAL || 5;

setInterval(() => {
	console.log('Checking posts...');

	post.model.find({}, (err, data) => {
		if (err) return console.log(err);

		data.forEach((post) => {
			const now = new Date().getTime(); // Get current time
			const postDate = new Date(post.date).getTime(); // Get post date

			if (now >= postDate) {
				// ----------------------------------------
				// Post on social media
				// ----------------------------------------

				if (post.facebook) {
					post.media == null || post.media == '' ? postFacebook(post.message) : postFacebookWithPicture(post.message, post.media); // Post on Facebook
					console.log('Posté sur Facebook');
				}

				if (post.twitter) {
					post.media == null || post.media == '' ? postTweet(post.message) : postTweetWithPicture(post.message, post.media); // Post on Twitter
					console.log('Posté sur Twitter');
				}

				// ----------------------------------------
				// Post on social media
				// ----------------------------------------

				deletePost(post._id); // Delete post in database
			}
		});
	});
}, 10000);

/**
 * It deletes a post from the database.
 * @param id - the id of the post to delete
 */
function deletePost(id) {
	post.model.deleteOne({ _id: id }, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Le post a été supprimé de la base de données');
		}
	});
}
