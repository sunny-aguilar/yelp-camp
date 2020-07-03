// interact with mongoDB

// get mongoose
const mongoose = require('mongoose');

// connect to the mongoDB
mongoose.connect('mongodb://localhost/cat_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// connections success/errors
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('connection success');
});

// add a new cat to DB
const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// retrieve the cats from the DB and console.log() each

