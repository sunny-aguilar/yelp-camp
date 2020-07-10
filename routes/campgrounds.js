/* ------------------------ */
// CAMPGROUND ROUTES
/* ------------------------ */
const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const campground = require('../models/campground');
const middleware = require('../middleware');


// campgrounds
router.get('/', (req, res) => {
    // get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
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

// POST/CREATE route - add a new campground to DB
router.post('/', middleware.isLoggedIn, (req, res) => {
    // get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const price = req.body.price;
    const desc = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    }

    const newCampground = {name: name, price: price, image: image, description: desc, author: author};

    // create new campground and save to database
    Campground.create(newCampground, (err, newlyCreated) => {
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
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});

// show specific campground & additional campground info
// :id can be any string, test it out in browser /campgrounds/asdfads
router.get('/:id', (req, res) => {
    // find campground with provided id
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
        if (err || !foundCampground) {
            // flash
            req.flash('error', 'Campground not found.');
            // handle error
            console.log(err);
            res.redirect('back');
        }
        else {
            // render template with that ID
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

// edit campgrounds
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render('campgrounds/edit', {campground: foundCampground});
    });
});

// update campground route
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
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
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect('/campgrounds');
        }
        else {
            res.redirect('/campgrounds');
        }
    });
});





module.exports = router;