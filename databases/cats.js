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

const catSchema = new mongoose.Schema({         // define a schema
    name: String,
    age: Number,
    temperament: String
});

const Cat = mongoose.model('Cat', catSchema);   // compile schema into model

// add a new cat to DB
// const george = new Cat({
//     name: 'Simba',
//     age: 9,
//     temperament: 'Fun '
// });

// george.save(function(err, cat) {    // save data to database & confirm
//     if (err) {
//         console.log('Data was not saved!');
//     }
//     else {
//         console.log('A cat was saved to the DB.')
//         console.log(cat);
//     }
// });

// Cat.create({         // other way to create and save cat
//     name: 'Cheetah',
//     age: 4,
//     temperament: 'deadly'
// }, function(err, cat) {
//     if (err) {
//         console.log('Error creating cat.');
//     }
//     else {
//         console.log('Success creating cat.');
//         console.log(Cat);
//     }
// });

// retrieve the cats from the DB and console.log() each
Cat.find({}, function(err, cats) {
    if (err) {
        console.log('Error condition on find()');
        console.log(err);
    }
    else {
        console.log('Find() successful.');
        console.log(cats);
    }
});



