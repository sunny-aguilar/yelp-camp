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
    image: String,
    description: String
});
const Campground = mongoose.model('Campground', campgroundSchema);

// names: Putah Creek, Lake Solano, Lake Berryesa, American River North Fork, Sacramento River, Folsom Lake, Cache Creek, South Lake Tahoe

// URLs: https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg, https://images.pexels.com/photos/354611/pexels-photo-354611.jpeg, https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg, https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg, https://images.pexels.com/photos/349732/pexels-photo-349732.jpeg, https://images.pexels.com/photos/619950/pexels-photo-619950.jpeg, https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg, https://images.pexels.com/photos/2516423/pexels-photo-2516423.jpeg

// for debugging purposes
// Campground.create(
//     {
//         name: 'Putah Creek',
//         image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg',
//         description: 'Putah Creek (Patwin: Liwaito) is a major stream in Northern California, a tributary of the Yolo Bypass, and ultimately, the Sacramento River. '
//     }
// );




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
            // give the data and the :allCampgrounds is the data were passing in
            res.render('index', {campgrounds: allCampgrounds});
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
            // default redirect is to get request
            res.redirect('/campgrounds');
        }
    });
});

// new campground route
app.get('/campgrounds/new', function(req, res) {
    res.render('new.ejs');
});

// show specific campground & additional campground info
// :id can be any string, test it out in browser /campgrounds/asdfads
app.get('/campgrounds/:id', function(req, res) {
    // find campground with provided id

    // render template with that ID
    res.render('show.ejs');
    // res.send('Specific campground ID.');
});



// start server & listen for connections
const port = 3000;
app.listen(port, console.log(`Server is listening on port ${port}`));