// ==============================================================================================
//
//
// Description: This is a file for the facebook API
//
//
// ==============================================================================================


// ============================================
// Import
// ============================================

require('dotenv').config();
const request = require('request');
const { submittedPostModel } = require('../models/collections/submittedPost.js');




// ============================================
// Variables and Constants
// ============================================

const token = process.env.FACEBOOK_TOKEN;
const pageId = process.env.FACEBOOK_PAGE_ID;

const serverIp = process.env.SERVER_HOST || 'localhost';
const serverPort = process.env.SERVER_PORT || 3000;
const serverProtocol = process.env.SERVER_PROTOCOL || 'http';




// ============================================
// Functions
// ============================================


function postFacebook(message) {
    request.post(
        `https://graph.facebook.com/v15.0/${pageId}/feed?access_token=${token}`,
        { form: { message: message } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);

                // Save the post to the database without constructor
                submittedPostModel.save(data.id, true, false, false, false);


            } else {
                console.log(error);
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
            !error && response.statusCode == 200 ? console.log(body) : console.log(error);
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