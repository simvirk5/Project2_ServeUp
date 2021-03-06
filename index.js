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
var user = require('./models/user');
var foodItem = require('./models/foodItems');

//Connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/authboiler');

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
//define homepage
app.get('/', function(req, res) {
	//render tells to look at view folder
	res.render('home');
})

//setup profile route
app.get('/profile', isLoggedIn, function(req, res) {
	foodItem.find({'userId': req.user.id}, function(err, foodItems) {
		if(err) {
			console.log(err);
		}
		else {
			res.render('profile', {foodItems})
		}
	})
});

//set post page
app.get('/post', isLoggedIn, function(req, res) {
	res.render('post');
});
// create new post
app.post('/post', function(req, res) {
	console.log(req.body);
	let postData = {
		userId: req.user.id,
		checkedItems: req.body['foodItems[]'],
		postItems: [req.body.postItems],
		foodBankLoc: req.body.foodBankLoc
	}
  	foodItem.create(postData, function(err) {
	  	if(err) {
	  		console.log(err);
	  	}
	  })
  	res.send();
});
//going to the specific id of that specific user
app.get('/profile/:id/update', function(req, res) {
	foodItem.find({'_id': req.params.id}, function(err, foodItem) {
		if(err) {
			console.log(err);
		}
		else {
			res.render('update', {foodItem});
		}
	})
});

app.put('/profile/:id', function(req, res) {
		let updateData = {
		checkedItems: req.body['foodItems[]'],
		postItems: [req.body.postItems],
		foodBankLoc: req.body.foodBankLoc
	}
	foodItem.findOneAndUpdate (
		//find specific id
		{'_id': req.params.id},
		//$set is parameter of the findoneupdate function and tells what we want to change
		{$set: updateData}, 
		//true is set to return modidied version of the original array
		{new: true},
		//call back function
		function(err) {
			if(err) {
				console.log(err);
			}
			else{
				res.send('update')
			}
		}
	)
})
//delete function- front end makes the request to delete received by backend
app.delete('/profile/:id', function(req, res) {
	foodItem.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.send(err);
		}
		else {
			res.send();
		}
	})
});
//Include any routes from controllers
app.use('/auth', require('./controllers/auth'));

app.listen(process.env.PORT || 3000);
