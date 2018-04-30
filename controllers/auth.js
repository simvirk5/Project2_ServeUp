//Include express
var express = require('express');
var passport = require('../config/passportConfig');
var router = express.Router();
//Include the user model
var User = require('../models/user');

//Render the page with the login form
router.get('/login', function(req, res) { 
	//will look in view and then Auth folder
	res.render('auth/login')
});

//Perform the login functionality 
router.post('/login', passport.authenticate('local', {
	successRedirect: '/post',
	successFlash: 'Logged in',
	failureRedirect: '/auth/login',
	failureFlash: 'Invalid credentials'
}));
	
//Render the page with the signup form
router.get('/signup', function(req, res) { 
	//will look in view and then Auth folder
	res.render('auth/signup')
});

//Perform the signup functionality once the submit button is clicked
router.post('/signup', function(req, res, next) {
	console.log('info from form', req.body);
//First when user signs up, we look for email incase it already exists
User.findOne({email: req.body.email}, function(err, user) {
		if(err) {
			console.log('bummer what happened', err);
			req.flash('error', 'Something went wrong!');
			res.redirect('/auth/login');
		}
		else if(user){
			//Don't want to let user sign up if they are already signed up w/same email
			req.flash('error', 'You already exist');
			res.redirect('/auth/signup');
		}
		else{
			User.create(req.body, function(err, createdUser) {
				if(err) {
					req.flash('error', 'noooooo why');
					return console.log('err', err);
				}
				console.log('Yay signed up, now lets log in!');
				passport.authenticate('local', {
					successRedirect: '/post',
					failureFlash: 'Sucessful account creation'
				}) (req, res, next);
			})
		}
	});
});
//Logout route removes user data from session 
//Then it redirects to home page
router.get('/logout', function(req, res) { 
	req.logout();
	req.flash('success', 'You are logged out. Until next time!');
	res.redirect('/');
});

//express routes within in this folder
module.exports = router;