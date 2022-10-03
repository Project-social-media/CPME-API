// ==============================================================================================
//
//
// Description: This is a file for the twitter API
//
//
// ==============================================================================================


// ============================================
// Import
// ============================================

require('dotenv').config();

// import the twitter library
const Twitter = require('twitter');




// ============================================
// Variables and Constants
// ============================================

// create a new client
const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});





// ============================================
// Functions
// ============================================


function postTweet(tweet) {
    client.post('statuses/update', { status: tweet }, function (error, tweet, response) {
        !error ? console.log(tweet) : console.log(error);
    });
}



function postTweetWithPicture(tweet, picture) {
    var data = require('fs').readFileSync(picture);

    // Make post request on media endpoint. Pass file data as media parameter
    client.post('media/upload', { media: data }, function (error, media, response) {
        if (error) {
            // If successful, a media object will be returned.
            console.log(error);
        } else {
            // Lets tweet it
            var status = {
                status: tweet,
                media_ids: media.media_id_string // Pass the media id string
            }

            client.post('statuses/update', status, function (error, tweet, response) {
                if (!error) {
                    console.log('tweet');
                } else {
                    console.log(error);
                }
            });
        }
    });
}




// ===========================================
// Export
// ===========================================

module.exports = {
    postTweet: postTweet,
    postTweetWithPicture: postTweetWithPicture,
}