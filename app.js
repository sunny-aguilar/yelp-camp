// yelp camp application

// add module
const   express     = require('express'),           // add express module
        app         = express(),
        bodyParser  = require('body-parser'),       // use body-parser to get form data
        mongoose    = require('mongoose'),              // add mongoose
        passport    = require('passport'),
        LocalStrategy = require('passport-local'),
        Campground  = require('./models/campground'),   // require seeds module
        Comment     = require('./models/comment'),
        User        = require('./models/user'),
        seedDB      = require('./seeds');

// CONFIGURATION
// add mongoose & connect to mondoDB
// if DB does not exits, this will create one otherwise connect to existing one
mongoose.connect('mongodb://localhost/yelp_camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.static(__dirname + '/public'));  // css file in public dir
app.set('view engine', 'ejs');                  // use EJS
// use body-parser --> {} object is required, just memorize it
app.use(bodyParser.urlencoded({extended: true}));

// seed database
seedDB();

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Moe always wags his tail when he sees me!',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


// ROUTES
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
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
        }
    });
});

// POST route
app.post('/campgrounds', function(req, res) {
    // get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newCampground = {name: name, image: image, description: desc};

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
    res.render('campgrounds/new');
});

// show specific campground & additional campground info
// :id can be any string, test it out in browser /campgrounds/asdfads
app.get('/campgrounds/:id', function(req, res) {
    // find campground with provided id
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if (err) {
            // handle error
            console.log(err);
        }
        else {
            // render template with that ID
            console.log(foundCampground);
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

// COMMENTS ROUTES
app.get('/campgrounds/:id/comments/new', function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('comments/new', {campground: campground});
        }
    });
});

app.post('/campgrounds/:id/comments', function(req, res) {
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        }
        else {
            console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                }
                else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    // create new comment
    // connect new comment to campground
    // redirect campground show page
});





// start server & listen for connections
const port = 3000;
app.listen(port, console.log(`Server is listening on port ${port}`));