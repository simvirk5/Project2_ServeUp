var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');	

//tell passport how to store data in the session
//serialization so we don't have to store entire user object in session
passport.serializeUser(function(user, callback) {
	//callback(error, data)
	callback(null, user.id);
})

passport.deserializeUser(function(id, callback) {
	User.findById(id).then(function(user) {
		//success
		callback(null, user);
	}).catch(function(err) {
		//something went wrong
		//.catch catches the exception 
		callback(err, null);
	});
});

//Actually implement logging in 
//note: callback function called when function is all done
passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(email, password, callback){
//What Needs to happen now:
//1. Find the user
//2. Validate credentials
//3. Done! (callback)
User.findOne({email: email}, function(err, user){
		if(err || !user || !user.isAuthenticated(password)){
			console.log('error', err);
			callback(err, null);
		}
		//user loged in corrected, so they can acces login
		else{
			callback(null, user);
		}
	});
}));

module.exports = passport;