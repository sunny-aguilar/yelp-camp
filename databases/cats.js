// interact with mongoDB

// get mongoose
const mongoose = require('mongoose');

// connect to the mongoDB
mongoose.connect('mongodb://localhost/cat_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// connections success/errors
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.error.bind(console, 'connection success')
});


// add a new cat to DB


// retrieve the cats from the DB and console.log() each

