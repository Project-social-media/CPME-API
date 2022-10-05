// ==============================================================================================
//
//
// Description: This is a file for the linkedin API
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

const token = process.env.LINKEDIN_TOKEN;
const authorID = process.env.LINKEDIN_AUTHOR_ID;




// ============================================
// Functions
// ============================================


// Post a message on linkedin with oauth2 token and body as json object
function postLinkedinWithBody(message) {

    console.log(message);

    const body = {
        "author": `urn:li:person:${authorID}`,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": message
                },
                "shareMediaCategory": "NONE"
            }
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
    }

    request.post(
        `https://api.linkedin.com/v2/ugcPosts?oauth2_access_token=${token}`,
        { json: body },
        function (error, response, body) {
            if (!error && response.statusCode == 201) {
                console.log(body);
            } else {
                console.log(error);
            }
        }
    )
};



// ===========================================
// Export
// ===========================================

module.exports = {
    postLinkedin: postLinkedinWithBody,
}