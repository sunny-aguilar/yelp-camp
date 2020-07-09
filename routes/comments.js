/* ------------------------ */
// COMMENT ROUTES
/* ------------------------ */
const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');


// comments new
router.get('/new', isLoggedIn, function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('comments/new', {campground: campground});
        }
    });
});

// comments create
router.post('/', isLoggedIn, function(req, res) {
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        }
        else {
            console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                }
                else {
                    // add username and id to comment
                    comment.author.id =  req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});


// edit comments
router.get('/:comment_id/edit', checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect('back');
        }
        else {
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
        }
    })
});

// handle edit comments logic
router.put('/:comment_id', checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComments) {
        if (err) {
            res.redirect('back');
        }
        else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// delete/destroy comments route
router.delete('/:comment_id', checkCommentOwnership, function(req, res) {
    // find by ID and remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect('back')
        }
        else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});





// middleware - checks if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// middleware - checks if user has permissions
function checkCommentOwnership(req, res, next) {
    // is user logged in
    if (req.isAuthenticated()) {
        // if logged in, does user own the campground otherwise redirect
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                // if not signed in, go back to previous page user was on
                res.redirect('back');
            }
            else {
                // does the user own the comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect('back');
                }
            }
        });
    }
    else {
        // if not signed in, redirect
        res.redirect('back');
    }
}


module.exports = router;