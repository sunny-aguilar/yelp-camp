// yelp camp application

// add express module
const express = require('express');
const app = express();

// use EJS
app.set('view engine', 'ejs');



// routes
app.get('/', function(req, res) {
    res.send('This will be the landing page.');
});

app.get('landing', function(req, res){
    res.send('This is the landing page.');
});


// start server
const port = 3000;
app.listen(port, console.log(`Server is listening on port #{port}`));