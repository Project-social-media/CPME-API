//
//
// --------------------------------------------
// Import
// --------------------------------------------
//
//

require('dotenv').config();

// import the twitter library
const Twitter = require('twitter');
const dateFormat = require('date-format');
const archiveModel = require(`${appRoot}/src/models/mongoDB/archives.model`);

//
//
// --------------------------------------------
// Variables and Constants
// --------------------------------------------
//
//

// create a new client
const client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

//
//
// --------------------------------------------
// Functions
// --------------------------------------------
//
//

function postTweet(tweet, id) {
	client.post('statuses/update', { status: tweet }, function (error, tweet, response) {
		//
		// 🚨 SYSTEME A REVOIR
		//

		// Update archive with id and add facebook id
		archiveModel.model.findByIdAndUpdate(id, { idMessageTwitter: tweet.id_str }, (err, data) => {
			if (err) return console.log(err);
		});

		//
		// 🚨 SYSTEME A REVOIR
		//

		!error ? console.log('tweet') : console.log(error);
	});
}

function postTweetWithPicture(tweet, picture) {
	var data = require('fs').readFileSync(picture);

	// Make post request on media endpoint. Pass file data as media parameter
	client.post('media/upload', { media: data }, function (error, media, response) {
		if (error) return console.log(error);

		// Lets tweet it
		var status = {
			status: tweet,
			media_ids: media.media_id_string, // Pass the media id string
		};

		client.post('statuses/update', status, function (error, tweet, response) {
			error ? console.log(error) : console.log('tweet.id_str');
		});
	});
}

function getTweetStats(idTweet) {

	client.get(`https://api.twitter.com/1.1/statuses/show/${idTweet}.json`, function (error, tweet, response) {
		if (error) return console.log(error);

		console.log("Nombre de retweets :", tweet.retweet_count);
		console.log("Nombre de likes :", tweet.user.favourites_count);
		console.log("Nombre de commentaires :", tweet.user.listed_count);
		console.log("Date de création :", tweet.created_at);

		console.log(dateFormat(new Date(), "ddd mmm dd yyyy HH:MM:ss UTC"));
	});
}

//
//
// --------------------------------------------
// Export
// --------------------------------------------
//
//

module.exports = { postTweet, postTweetWithPicture, getTweetStats };
