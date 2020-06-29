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
    res.send('Campgrounds page');
});


// start server
const port = 3000;
app.listen(port, console.log(`Server is listening on port #{port}`));