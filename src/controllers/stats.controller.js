//
//
// --------------------------------------------
// Import
// --------------------------------------------
//
//

const Twitter = require('twitter');
const sendError = require(`${appRoot}/src/scripts/send-error`);

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const request = require('request');

const facebook = process.env.FACEBOOK_TOKEN;
const facebookPostStats = "?fields=reactions.summary(true),comments.summary(true)";
const facebookPageStats = "insights/page_impressions,page_fan_adds_unique";

//
//
// --------------------------------------------
// Twitter controllers
// --------------------------------------------
//
//

exports.getTweetStats = async (req, res) => {
    try {
        const tweet = await getTweet(req.params.id_tweet);
        res.send(tweet);
    } catch (err) {
        return sendError(req, res, 500, err.message);
    }
}

exports.getTwittosStats = async (req, res) => {
    try {
        const tempId = req.params.id_user;
        const idUser = tempId.toString();
        const twittos = await getTwittos(idUser);
        res.send(twittos);
    } catch (err) {
        return sendError(req, res, 500, err.message);
    }
}

function getTweet(idTweet) {

    client.get(`statuses/show/${idTweet}.json`, function (error, tweet, response) {
        if (error) return console.log(error);
        console.log(tweet);
        return tweet;
    });
}


function getTwittos(idUser) {

    client.get(`https://api.twitter.com/1.1/users/show.json?user_id=${idUser}`, function (error, user, response) {
        if (error) return console.log(error);
        console.log(user);
        return user;
    });
}

//
//
// --------------------------------------------
// Facebook controllers
// --------------------------------------------
//
//

exports.getFacebookPostStats = async (req, res) => {
    try {
        const post = await getFacebookPost(req.params.id_post);
        res.send(post);
    } catch (err) {
        return sendError(req, res, 500, err.message);
    }
}

exports.getFacebookPageStats = async (req, res) => {
    try {
        const page = await getFacebookPage(req.params.id_page);
        res.send(page);
    } catch (err) {
        return sendError(req, res, 500, err.message);
    }
}



function getFacebookPost(idFacebookPost) {
    request.get(`https://graph.facebook.com/${idFacebookPost}${facebookPostStats}&access_token=${facebook}`, function (error, post, response) {
        if (error) return console.log(error);
        console.log(JSON.parse(post.body));
        return post;
    });
}

function getFacebookPage() {
    const idFacebookPage = '100545269503535';

    request.get(`https://graph.facebook.com/${idFacebookPage}/${facebookPageStats}?access_token=${facebook}`, function (error, page, response) {
        if (error) return console.log(error);
        console.log(JSON.parse(page.body));
        return page;
    });
}