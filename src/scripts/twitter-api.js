require('dotenv').config();
const Twitter = require('twitter');
const archiveModel = require(`${appRoot}/src/models/mongoDB/archives.model`);

const client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

function postTweet(tweet, id) {
	client.post('statuses/update', { status: tweet }, function (error, tweet, response) {
		archiveModel.model.findByIdAndUpdate(id, { idMessageTwitter: tweet.id_str }, (err, data) => {
			if (err) return console.log(err);
		});
		!error ? console.log('tweet') : console.log(error);
	});
}

function postTweetWithPicture(tweet, picture) {
	const data = require('fs').readFileSync(picture);

	client.post('media/upload', { media: data }, function (error, media, response) {
		if (error) return console.log(error);
		const status = {
			status: tweet,
			media_ids: media.media_id_string,
		};
		client.post('statuses/update', status, function (error, tweet, response) {
			error ? console.log(error) : console.log('tweet.id_str');
		});
	});
}

module.exports = { postTweet, postTweetWithPicture };
