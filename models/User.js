 /**
  * This model represents the User Object. The User stores an email, password,
  * and a boolean that is True if the User is a Student and is False otherwise.
  * Each email must be unique.  
  *
  * Rep invariant: A User has an email and a password. No two Users can have the
  * 			   same email.
  *
  * @author Lynda Tang
  */
var mongoose = require("mongoose");
var passwordHash = require('password-hash');

var UserSchema = mongoose.Schema({
  email: {
  	type: String, 
  	unique: true, 
  	required: true, 
  	immutable: true
  },
  password: {
  	type: String, 
  	required: true, 
  	immutable: true
  },
  isStudent: {
  	type: Boolean, 
  	required: true, 
  	immutable: true
  }
});

/**
 * Adds a User to the User collection
 * @param {String} email the email of this User
 * @param {String} password the password of this User
 * @param {Boolean} isStudent whether or not this User is a Student
 * @param {Function} callback the callback function that sents the user created in the form
 * 								of (err, User)
 */
UserSchema.statics.addUser = function(email, password, isStudent, callback) {
	var hashedPassword = passwordHash.generate(password);
	findUser(email, function(err, user) {
		if (user) {
			callback("This username has already been taken.");
		} else {
			User.create({   email: email, 
		                password: hashedPassword,
		                isStudent: isStudent}, 
			function(err, user) {
			  if (err) {
			    callback(err.message);
			  } else {
			  	callback(null, user);
			  }
			});
		}
	});
};

/**
 * Logins a User with the email and password given.  Does not login if email doesn't exist,
 *						or if wrong email and password pair.
 * @param {String} email the given email
 * @param {String} password the given password
 * @param {Function} callback the callback function that sends the current User in the form
 * 								of (err, currUser). Will throw an error if the User with the
 * 								username doesn't exist or if the password does not match
 */
UserSchema.statics.loginUser = function(email, password, callback) {
	findUser(email, function(err, user){
		if (user == null) {
			callback("This user does not exist.");
		} else {
			if (passwordHash.verify(password, user.password)) {
				callback(null, user);
			} else {
				callback("Wrong username and password.");
			}
		}
	});
};


/**
 * Finds one User with a particular email address
 * @param {String} email the given email
 * @param {Function} callback the callback function that is called afterwards
 */
var findUser = function(email, callback){
	User.findOne({email: email}, callback);
};

var User = mongoose.model('User', UserSchema);
module.exports = mongoose.model("User", UserSchema);