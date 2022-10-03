// ============================================
// Import
// ============================================

require('dotenv').config();
const request = require('request');

const token = process.env.FACEBOOK_TOKEN;
const pageId = process.env.FACEBOOK_PAGE_ID;

const serverIp = process.env.SERVER_HOST || 'localhost';
const serverPort = process.env.SERVER_PORT || 3000;
const serverProtocol = process.env.SERVER_PROTOCOL || 'http';

function postFacebook(message) {
    request.post(
        `https://graph.facebook.com/v15.0/${pageId}/feed?access_token=${token}`,
        { form: { message: message } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            } else {
                console.log(error)
            }
        }
    )
}


function postFacebookWithPicture(message, picture) {

    const url = `${serverProtocol}://${serverIp}:${serverPort}/image/${picture}`;

    console.log(url);

    request.post(
        `https://graph.facebook.com/v15.0/${pageId}/photos?access_token=${token}`,
        { form: { message: message, url: url } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            } else {
                console.log(error)
            }
        }
    )
}


// ===========================================
// Export
// ===========================================

module.exports = {
    postFacebook: postFacebook,
    postFacebookWithPicture: postFacebookWithPicture
}