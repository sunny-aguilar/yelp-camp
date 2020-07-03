// yelp camp application

// add express module
const express = require('express');
const app = express();

// add mongoose & connect to mondoDB
// if DB does not exits, this will create one otherwise connect to existing one
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp_camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// use body-parser to get form data
const bodyParser = require('body-parser');

// use EJS
app.set('view engine', 'ejs');

// use body-parser --> {} object is required, just memorize it
app.use(bodyParser.urlencoded({extended: true}));


// SCHEMA SET-UP
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});
const Campground = mongoose.model('Campground', campgroundSchema);

// add app data
// Campground.create(
//     {name: 'Lake Solano', image: 'https://images.pexels.com/photos/354611/pexels-photo-354611.jpeg'},
//     function(err, campground) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log('Newly created campground:');
//             console.log(campground);
//         }
//     }
// );




// app data --> will be placed in database later
const campgrounds = [
    {name: 'Putah Creek', image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg'},
    {name: 'Lake Solano', image: 'https://images.pexels.com/photos/354611/pexels-photo-354611.jpeg'},
    {name: 'Lake Berryesa', image: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg'},
    {name: 'American River North Fork', image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg'},
    {name: 'Sacramento River', image: 'https://images.pexels.com/photos/349732/pexels-photo-349732.jpeg'},
    {name: 'Folsom Lake', image: 'https://images.pexels.com/photos/619950/pexels-photo-619950.jpeg'},
    {name: 'Cache Creek', image: 'https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg'},
    {name: 'South Lake Tahoe', image: 'https://images.pexels.com/photos/2516423/pexels-photo-2516423.jpeg'}
];




// routes
app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            // render the file
            // {campgrounds: campgrounds} -> campgrounds: is the name we want to
            // give the data and the :campgrounds is the data were passing in
            res.render('campgrounds', {campgrounds: allCampgrounds});
        }
    });
});

// POST route
app.post('/campgrounds', function(req, res) {
    // get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image};

    // create new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        }
        else {
            // redirect to campgrounds page
            res.redirect('/campgrounds');
        }
    });

    // redirect back to campgrounds page
    // default redirect is to get request
    // res.redirect('/campgrounds');
});

// new campground route
app.get('/campgrounds/new', function(req, res) {
    res.render('new.ejs');
});




// start server & listen for connections
const port = 3000;
app.listen(port, console.log(`Server is listening on port ${port}`));