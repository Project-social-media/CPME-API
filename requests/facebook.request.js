// ============================================
// Import
// ============================================

require('dotenv').config();
const request = require('request');

const token = process.env.FACEBOOK_TOKEN;
const pageId = process.env.FACEBOOK_PAGE_ID;

request.post(
    `https://graph.facebook.com/v15.0/${pageId}/feed?access_token=${token}`,
    { form: { message: '65465148554' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        } else {
            console.log(error)
        }
    }
)