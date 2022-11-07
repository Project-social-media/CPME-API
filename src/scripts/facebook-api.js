//
//
// --------------------------------------------
// Import
// --------------------------------------------
//
//

require('dotenv').config();
const request = require('request');

//
//
// --------------------------------------------
// Variables and Constants
// --------------------------------------------
//
//

const token = process.env.FACEBOOK_TOKEN;
const pageId = process.env.FACEBOOK_PAGE_ID;

const serverIp = process.env.SERVER_HOST || 'localhost';
const serverPort = process.env.SERVER_PORT || 3000;
const serverProtocol = process.env.SERVER_PROTOCOL || 'http';

//
//
// --------------------------------------------
// Functions
// --------------------------------------------
//
//

/**
 * It posts a message to a Facebook page
 * @param message - The message you want to post to Facebook.
 */
function postFacebook(message) {
	request.post(`https://graph.facebook.com/v15.0/${pageId}/feed?access_token=${token}`, { form: { message: message } }, function (error, response, body) {
		!error && response.statusCode == 200 ? console.log(body) : console.log(error);
	});
}

/**
 * It takes a message and a picture name as parameters, and posts the message and picture to the
 * Facebook page
 * @param message - The message you want to post on Facebook.
 * @param picture - The name of the picture to post.
 */
function postFacebookWithPicture(message, picture) {
	const url = `${serverProtocol}://${serverIp}:${serverPort}/image/${picture}`;

	request.post(`https://graph.facebook.com/v15.0/${pageId}/photos?access_token=${token}`, { form: { message: message, url: url } }, function (error, response, body) {
		!error && response.statusCode == 200 ? console.log(body) : console.log(error);
	});
}

//
//
// --------------------------------------------
// Export
// --------------------------------------------
//
//

module.exports = { postFacebook, postFacebookWithPicture };
