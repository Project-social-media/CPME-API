// ============================================
// Import
// ============================================

const express = require('express');
const { PostModel } = require('../models/collections/post.model.js');
const { postTweet, postTweetWithPicture } = require('../functions/twitter.js');
const { postFacebook, postFacebookWithPicture } = require('../functions/facebook.js');
require('dotenv').config();




// ============================================
// Functions
// ============================================


// Delete post in database if the post date is older than now //

checkInterval = process.env.CHECK_INTERVAL || 5;

setInterval(() => {
    PostModel.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            data.forEach((post) => {
                const now = new Date().getTime(); // Get current time
                const postDate = new Date(post.date).getTime(); // Get post date
                const postMessage = post.message; // Get post message
                const postMedia = post.media; // Get post media
                const [facebook, twitter, instagram, linkedin] = [post.facebook, post.twitter, post.instagram, post.linkedin];
                if (now >= postDate) {

                    // ----------------------------------------
                    // Post on social media
                    // ----------------------------------------

                    if (twitter) {
                        if (postMedia == null || postMedia == "") {
                            postTweet(postMessage); // Post tweet
                        } else {
                            postTweetWithPicture(postMessage, postMedia); // Post tweet with picture
                        }
                    }

                    if (facebook) {
                        if (postMedia == null || postMedia == "") {
                            postFacebook(postMessage); // Post on Facebook
                        } else {
                            postFacebookWithPicture(postMessage, postMedia); // Post on Facebook with picture
                        }
                    }


                    // ----------------------------------------
                    // Post on social media
                    // ----------------------------------------

                    PostModel.deleteOne({ _id: post._id }, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Post deleted');
                        }
                    });
                }
            });
        }
    });
}, 10000);




