// ============================================
// Import
// ============================================

require('dotenv').config();
const request = require('request');

const token = process.env.FACEBOOK_TOKEN;
const pageId = process.env.FACEBOOK_PAGE_ID;

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
    request.post(
        `https://graph.facebook.com/v15.0/${pageId}/photos?access_token=${token}`,
        { form: { message: message, url: picture } },
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