const cpmeTwitterId = '1573964604832681984';
const timeRange = 90;

//
// FACEBOOK API


const fb = require('fb');
const facebook = process.env.FACEBOOK_TOKEN;






















//
// TWITTER API
//

const Twitter = require('twitter');
const sendError = require(`${appRoot}/src/scripts/send-error`);

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});


//GET Twitter user useful stats
exports.getTwitterUserStats = async (req, res) => {
    try {
        const twitterUserPostStats = await getTwitterUserStats();
        if (!twitterUserPostStats) return res.status(404).json({ message: "Twitter user post stats not found" });
        res.status(200).json(twitterUserPostStats);
    } catch (err) {
        sendError(req, res, 500, err);
    }
}

async function getTwitterUserStats() {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - timeRange);
    const endDate = new Date();

    let likesCount = 0;
    let viewsCount = 0;
    let sharesCount = 0;
    let followersCount = 0;
    let startDateMilliseconds = Date.parse(startDate);
    let endDateMilliseconds = Date.parse(endDate);

    let user = await client.get(`users/show.json`, { user_id: cpmeTwitterId });
    followersCount = user.followers_count;

    let tweets = await client.get(`statuses/user_timeline`, { user_id: cpmeTwitterId });
    tweets.forEach(tweet => {
        let tweetDateMilliseconds = Date.parse(tweet.created_at);
        if (tweetDateMilliseconds > startDateMilliseconds && tweetDateMilliseconds < endDateMilliseconds) {
            likesCount += tweet.favorite_count;
            viewsCount += tweet.retweet_count;
            sharesCount += tweet.retweet_count;
        }
    });

    return { likesCount, viewsCount, sharesCount, followersCount };
}


exports.getFacebookPageStats = async (req, res) => {
    try {
        const facebookPageStats = await getFacebookPageStats();
        if (!facebookPageStats) return res.status(404).json({ message: "Facebook page stats not found" });
        res.status(200).json(facebookPageStats);
    } catch (err) {
        sendError(req, res, 500, err);
    }
}

let since = Math.round(Date.now() / 1000) - 30 * 24 * 3600; // 30 days in seconds


async function getFacebookPageStats() {
    // Assume that `facebook` has been correctly initialized with a valid access token
    let url = `https://graph.facebook.com/100545269503535/posts?since=${since}&access_token=${facebook}`;
    let response = await fetch(url);
    let data = await response.json();
    let posts = data.data;

    let reactionsCount = 0;
    for (let post of posts) {
        let postUrl = `https://graph.facebook.com/${post.id}/reactions?summary=true&access_token=${facebook}`;
        let postResponse = await fetch(postUrl);
        let postData = await postResponse.json();
        reactionsCount += postData.summary.total_count;
    }

    return { reactionsCount };
}
