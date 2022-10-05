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




// ============================================
// Variables and Constants
// ============================================

const token = process.env.INSTAGRAM_TOKEN;
const pageId = process.env.INSTAGRAM_PAGE_ID;

const serverIp = process.env.SERVER_HOST || 'localhost';
const serverPort = process.env.SERVER_PORT || 3000;
const serverProtocol = process.env.SERVER_PROTOCOL || 'http';




// ============================================
// Functions
// ============================================

function postInstagram(message, picture) {

    const url = `${serverProtocol}://${serverIp}:${serverPort}/image/${picture}`;

    request.post(
        `https://graph.facebook.com/v15.0/${pageId}/media?access_token=${token}&caption=${message}`,
        { form: { image_url: url } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const id = JSON.parse(body).id;
                console.log(id);

                // post the image on the page with caption
                request.post(
                    `https://graph.facebook.com/v15.0/${pageId}/media_publish?access_token=${token}`,
                    { form: { creation_id: id } },
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(body);
                        } else {
                            console.log(error);
                        }
                    }
                )
            }
        }
    )
}


// ===========================================
// Export
// ===========================================

module.exports = {
    postInstagram: postInstagram,
}