// yelp camp application

// add modules
const   express             = require('express'),               // add express module
        app                 = express(),
        bodyParser          = require('body-parser'),
        mongoose            = require('mongoose'),              // add mongoose
        passport            = require('passport'),
        LocalStrategy       = require('passport-local'),
        methodOverride      = require('method-override'),
        Campground          = require('./models/campground'),   // require seeds module
        Comment             = require('./models/comment'),
        User                = require('./models/user'),
        seedDB              = require('./seeds');

// require routes
const   commentRoutes       = require('./routes/comments'),
        campgroundRoutes    = require('./routes/campgrounds'),
        indexRoutes         = require('./routes/index');



// CONFIGURATION
// add mongoose & connect to mondoDB
// if DB does not exits, this will create one otherwise connect to existing one
mongoose.connect('mongodb://localhost/yelp_camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// use body-parser --> {} object is required, just memorize it
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');                  // use EJS
app.use(express.static(__dirname + '/public')); // css file in public dir
app.use(methodOverride('_method'));
seedDB();                                       // seed database

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Moe always wags his tail when he sees me!',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware - passes req.user to every route
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// use route files
// ('/', is used to shorten url on routes
app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);



// start server & listen for connections
const port = 3000;
app.listen(port, console.log(`Server is listening on port ${port}`));