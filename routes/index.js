/* ------------------------ */
// ROOT & AUTH ROUTES
/* ------------------------ */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


// ROOT route
router.get('/', function(req, res) {
    res.render('landing');
});

// REGISTRATION - show registration form
router.get('/register', function(req, res) {
    res.render('register');
});

// REGISTRATION - handle registration logic
router.post('/register', function(req, res) {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            // flash message
            req.flash('error', err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function() {
            // flash message
            req.flash('success', 'Welcome to YelpCamp ' + user.username);
            res.redirect('/campgrounds');
        });
    });
});

// LOGIN - render login form
router.get('/login', function(req, res) {
    res.render('login' );
});

// handle login logic (see middleware)
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), function(req, res) { // this callback is not doing anything
});

// LOGOUT - logout functionality
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'Logged you out!');
    res.redirect('/campgrounds');
});


// // middleware - checks if user is logged in
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/login');
// }

module.exports = router;