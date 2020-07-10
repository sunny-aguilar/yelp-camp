// required modules
const Campground = require('../models/campground');
const Comment = require('../models/comment');

// all the middleware here
const middlewareObj = {};

// middleware - checks if user has permissions
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    // is user logged in
    if (req.isAuthenticated()) {
        // if logged in, does user own the campground otherwise redirect
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err || !foundCampground) {
                // flash message
                req.flash('error', 'Campground not found {DB error}!');
                // if not signed in, go back to previous page user was on
                res.redirect('back');
            }
            else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    // flash message
                    req.flash('error', 'You are not authorized to do that.');
                    res.redirect('back');
                }
            }
        });
    }
    else {
        // flash message
        req.flash('error', 'Please Login First.');
        // if not signed in, redirect
        res.redirect('back');
    }
}

// middleware - checks if user has permissions
middlewareObj.checkCommentOwnership = function(req, res, next) {
    // is user logged in
    if (req.isAuthenticated()) {
        // if logged in, does user own the campground otherwise redirect
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err || !foundComment) {
                // flash
                req.flash('error', 'Comment not found');
                // if not signed in, go back to previous page user was on
                res.redirect('back');
            }
            else {
                // does the user own the comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    // flash message
                    req.flash('error', 'You are not authorized to do that.');
                    res.redirect('back');
                }
            }
        });
    }
    else {
        // flash message
        req.flash('error', 'Please Login First.');
        // if not signed in, redirect
        res.redirect('back');
    }
}

// middleware - checks if user is logged in
middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // flash message
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('/login');
}

module.exports = middlewareObj;