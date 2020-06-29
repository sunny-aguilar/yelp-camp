// yelp camp application

// add express module
const express = require('express');
const app = express();

// use EJS
app.set('view engine', 'ejs');



// routes
app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    const campgrounds = [
        {name: 'Putah Creek', image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg'},
        {name: 'Lake Berryesa', image: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg'},
        {name: 'American River North Fork', image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg'},
        {name: 'Saramento River', image: 'https://images.pexels.com/photos/756780/pexels-photo-756780.jpeg'},
        {name: 'Cache Creek', image: 'https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg'},
        {name: 'South Lake Tahoe', image: 'https://images.pexels.com/photos/2516423/pexels-photo-2516423.jpeg'}
    ];
    // {campgrounds: campgrounds} -> campgrounds: is the name we want to give the data
    // and the : campgrounds is the data were passing in
    res.render('campgrounds', {campgrounds: campgrounds});
});


// start server
const port = 3000;
app.listen(port, console.log(`Server is listening on port ${port}`));