/* ------------------------ */
// COMMENT ROUTES
/* ------------------------ */
const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware');


// comments new
router.get('/new', middleware.isLoggedIn, (req, res) => {
    // find campground by id
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('comments/new', {campground: campground});
        }
    });
});

// comments create
router.post('/', middleware.isLoggedIn, (req, res) => {
    // lookup campground using ID
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        }
        else {
            console.log(req.body.comment);
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    // flash message
                    req.flash('error', 'Something went wrong.');
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
                    // flash message
                    req.flash('success', 'Successfully added a comment.');
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});


// edit comments
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err || !foundCampground) {
            req.flash('error', 'No campground found');
            return res.redirect('back');
        }
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.redirect('back');
            }
            else {
                res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
            }
        })
    });
});

// handle edit comments logic
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
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
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    // find by ID and remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect('back')
        }
        else {
            // flash message
            req.flash('success', 'Comment deleted.');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});



module.exports = router;