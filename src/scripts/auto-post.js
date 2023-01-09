//
//
// --------------------------------------------
// Require
// --------------------------------------------
//
//

const post = require(`${appRoot}/src/models/mongoDB/posts.model`);
const archiveModel = require(`${appRoot}/src/models/mongoDB/archives.model`);
const { postFacebook, postFacebookWithPicture } = require(`${appRoot}/src/scripts/facebook-api`);
const { postTweet, postTweetWithPicture } = require(`${appRoot}/src/scripts/twitter-api`);
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
	post.model.find({}, (err, data) => {
		if (err) return console.log(err);

		data.forEach((post) => {
			const now = new Date().getTime(); // Get current time
			const postDate = new Date(post.date).getTime(); // Get post date

			if (now >= postDate) {
				// ----------------------------------------
				// Post on social media
				// ----------------------------------------

				const archive = new archiveModel.model({
					message: post.message,
				});

				//
				// 🚨 SYSTEME A REVOIR
				//

				archive.save((err, data) => {
					if (err) return console.log('error', err);

					if (post.facebook) {
						post.media == null || post.media == '' ? postFacebook(post.message, data._id) : postFacebookWithPicture(post.message, post.media); // Post on Facebook
					}

					if (post.twitter) {
						post.media == null || post.media == '' ? postTweet(post.message, data._id) : postTweetWithPicture(post.message, post.media); // Post on Twitter
					}
				});

				//
				// 🚨 SYSTEME A REVOIR
				//

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
