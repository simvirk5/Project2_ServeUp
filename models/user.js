//setting up routes
var mongoose = require ('mongoose');
var bcrypt = require('bcrypt');
//define what a user looks like in the database
var userSchema = new mongoose.Schema({
	name: String, 
	email: {
		type: String,
		required: true, 
		unique: true
	},
	
	password: {
		type: String,
		required: true
	}

});
//Make a function that checks whether a password is correct
userSchema.methods.isAuthenticated = function(password) {
	//compare typedinpassword(what user is typing in) versus actual password
	//correctpassword is boolean, either true or false
	var isCorrectPassword = bcrypt.compareSync(password, this.password);
	return isCorrectPassword ? this: false; 
}

//Hash the password BEFORE saving a user to the DB
//listen for when user is being created, but exceute code BEFORE the name and password get created in the DB.
userSchema.pre('save', function(next) {
	//is the user being updated?
	//if yes, they already have a password, which has already been hased. No action required.
	//first is when it's getting updated
	//next one is when it's getting hashed
	if(!this.isModified('password')) {
		next();
	}
	else {
		this.password = bcrypt.hashSync(this.password, 10);
		next();
	}
});

module.exports = mongoose.model('User', userSchema);