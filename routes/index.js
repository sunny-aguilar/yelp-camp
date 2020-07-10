/* ------------------------ */
// ROOT & AUTH ROUTES
/* ------------------------ */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


// ROOT route
router.get('/', (req, res) => {
    res.render('landing');
});

// REGISTRATION - show registration form
router.get('/register', (req, res) => {
    res.render('register');
});

// REGISTRATION - handle registration logic
router.post('/register', (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            // flash message
            req.flash('error', err.message);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, () => {
            // flash message
            req.flash('success', 'Welcome to YelpCamp ' + user.username);
            res.redirect('/campgrounds');
        });
    });
});

// LOGIN - render login form
router.get('/login', (req, res) => {
    res.render('login' );
});

// handle login logic (see middleware)
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), (req, res) => { // this callback is not doing anything
});

// LOGOUT - logout functionality
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged you out.');
    res.redirect('/campgrounds');
});



module.exports = router;