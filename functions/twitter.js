// ==============================================================================================
//
//
// Description: This is a test file for the twitter API
//
//
// ==============================================================================================


// import the twitter library
const Twitter = require('twitter');

// create a new client
const client = new Twitter({
    consumer_key: 'BCOLvF61fT28qrWkRR5dpzkpm',
    consumer_secret: 'EXzAoAD7JWQMWygGjMQw1uNqfisx7X66IrRsZBL7MyGrLa75bs',
    access_token_key: '1573964604832681984-vn8gKZt6KomC136qXQjI1qrrfejCCF',
    access_token_secret: 'WTY4Tgd27DHt7fVSYrhDSwB1QAkpBsVD9vKb4a4nNlcxH'
});


function postTweet(tweet) {
    client.post('statuses/update', { status: tweet }, function (error, tweet, response) {
        if (!error) {
            console.log(tweet);
        } else {
            console.log(error);
        }
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
                    console.log(tweet);
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