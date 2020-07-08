/* ------------------------ */
// CAMPGROUND ROUTES
/* ------------------------ */
const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const campground = require('../models/campground');


// campgrounds
router.get('/', function(req, res) {
    console.log(req.user);
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            // render the file
            // {campgrounds: campgrounds} -> campgrounds: is the name we want to
            // give the data and the :allCampgrounds is the data were passing in
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
        }
    });
});

// POST route
router.post('/', isLoggedIn, function(req, res) {
    // get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    }

    const newCampground = {name: name, image: image, description: desc, author: author};

    // create new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        }
        else {
            // redirect to campgrounds page
            // default redirect is to get request
            console.log(newlyCreated);
            res.redirect('/campgrounds');
        }
    });
});

// new campground route
router.get('/new', isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});

// show specific campground & additional campground info
// :id can be any string, test it out in browser /campgrounds/asdfads
router.get('/:id', function(req, res) {
    // find campground with provided id
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if (err) {
            // handle error
            console.log(err);
        }
        else {
            // render template with that ID
            console.log(foundCampground);
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

// edit campgrounds
router.get('/:id/edit', function(req, res) {
    // is user logged in
    if (req.isAuthenticated()) {
        // if logged in, does user own the campground otherwise redirect
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err) {
                res.redirect('/campgrounds');
            }
            else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    res.render('campgrounds/edit', {campground: foundCampground});
                }
                else {
                    res.send('You dont have permission to do that!');
                }
            }
        });
    }
    else {
        res.send('You need to be logged in');
    }
    // if no, redirect

});

// update campground route
router.put('/:id', function(req, res) {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect('/campgrounds');
        }
        else {
            // redirect show campgrounds page
            res.redirect('/campgrounds/' + req. params.id);
        }
    });
});

// destroy campground route
router.delete('/:id', function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect('/campgrounds');
        }
        else {
            res.redirect('/campgrounds');
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

module.exports = router;