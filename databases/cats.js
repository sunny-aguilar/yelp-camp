// interact with mongoDB

// get mongoose
const mongoose = require('mongoose');

// connect to the mongoDB
mongoose.connect('mongodb://localhost/cat_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// add a new cat to DB


// retrieve the cats from the DB and console.log() each

