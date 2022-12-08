const Twitter = require('twitter');
const FB = require('fb');
const sendError = require(`${appRoot}/src/scripts/send-error`);

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const facebook = process.env.FACEBOOK_TOKEN;
const facebookPostStats = "reactions.summary(true),comments.summary(true)";
const facebookPageStats = "100545269503535/insights/page_impressions,page_fan_adds_unique";

const instagramPageId = "17841455333376057";
const instagramPostStats = "caption,comments_count,like_count,media_type,permalink,timestamp,username";
const instagramPageStats = "business_discovery.username(bluebottle){followers_count,media_count}";

// Twitter controllers
exports.getTweetStats = async (req, res) => {
    try {
        const tweetData = await getTweet(req.params.id_tweet);
        if (!tweetData) return res.status(404).json({ message: "Tweet not found" });
        res.status(200).json(tweetData);
    } catch (err) {
        sendError(req, res, 500, err.message);
    }
}

exports.getTwittosStats = async (req, res) => {
    try {
        const twittosData = await getTwittos(req.params.id_user);
        if (!twittosData) return res.status(404).json({ message: "Twittos not found" });
        res.status(200).json(twittosData);
    } catch (err) {
        sendError(req, res, 500, err.message);
    }
}

async function getTweet(idTweet) {
    let res = await client.get(`statuses/show/${idTweet}.json`, {});
    return res;
}

async function getTwittos(idUser) {
    let res = await client.get(`statuses/user_timeline/${idUser}.json`, {});
    return res;
}

// Facebook controllers
exports.getFacebookPostStats = async (req, res) => {
    try {
        const postStats = await getFacebookPost(req.params.id_post);
        if (!postStats) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(postStats);
    } catch (err) {
        sendError(req, res, 500, err.message);
    }
}

exports.getFacebookPageStats = async (req, res) => {
    try {
        const pageStats = await getFacebookPage();
        if (!pageStats) return res.status(404).json({ message: "Page not found" });
        res.status(200).json(pageStats);
    } catch (err) {
        sendError(req, res, 500, err.message);
    }
}

async function getFacebookPost(idFacebookPost) {
    let res = await FB.api(idFacebookPost, 'GET', { "fields": facebookPostStats, "access_token": facebook });
    return res;
}

async function getFacebookPage() {
    let res = await FB.api(facebookPageStats, 'GET', { "access_token": facebook });
    return res;
}
// Instagram controllers
exports.getInstagramPostStats = async (req, res) => {
    try {
        const postStats = await getInstagramPost(req.params.id_post);
        if (!postStats) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(postStats);
    } catch (err) {
        sendError(req, res, 500, err.message);
    }
}

exports.getInstagramPageStats = async (req, res) => {
    try {
        const pageStats = await getInstagramPage();
        if (!pageStats) return res.status(404).json({ message: "Page not found" });
        res.status(200).json(pageStats);
    } catch (err) {
        sendError(req, res, 500, err.message);
    }
}

async function getInstagramPost(idInstagramPost) {
    let res = await FB.api(idInstagramPost, 'GET', { fields: instagramPostStats, "access_token": facebook });
    return res;
}


async function getInstagramPage() {
    let res = await FB.api(instagramPageId, 'GET', { fields: instagramPageStats, "access_token": facebook });
    return res;
}