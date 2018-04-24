//Modules I need to running this app
require('dotenv').config();//loads the .env
var bodyParser = require('body-parser');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var app = express();
var passport = require('./config/passportConfig');
var session = require('express-session');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
//Connect to the database
mongoose.connect('mongodb://localhost/authboiler');

app.use(express.static('public'))

//set and use statements
app.set('view engine', 'ejs');
//middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(expressLayouts);


app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Just a convenience, but makes life easier...
//If theres any flash messages, write them in this alert messages
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
})


//Top-level Routes
	//define homepage
app.get('/', function(req, res) {
	//render tells to look at view folder
	res.render('home');
})

	//setup profile route
app.get('/profile', isLoggedIn, function(req, res) {
	res.render('profile');
});

app.get('/map', function(req, res) {
	res.render('map');
})

//Include any routes from controllers
app.use('/auth', require('./controllers/auth'));

//Lister
app.listen(process.env.PORT || 3000);
