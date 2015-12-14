 /**
  * This model represents the Employer Object. All Employers are also Users
  * (and therefore refers to a User object with the isStudent field equal to 
  * False). Besides email and password, Employers additionally keep track of 
  * the company name, and whether the employer has or has not been verified. 
  * Employer is one of the two possible types of Users.
  *
  * Rep invariant: An Employer is a type of User. No two Employers can represent 
  *				   the same company not have the same User. The User referred to 
  * 			   by Employer must not have isStudent
  *
  * @author Lynda Tang
  */
var mongoose = require("mongoose");
var User = require('../models/User.js');

var EmployerSchema = mongoose.Schema({
  	user: {
	  	type: mongoose.Schema.Types.ObjectId, 
	  	ref: 'User', 
	  	unique: true, 
	  	required: true,
	  	immutable: true
	},
 	company: {
	  	type: String, 
	  	unique: true, 
	  	required: true,
	  	immutable: true
	},
  	verified: {
	  	type: Boolean,
	  	required: true
	}
});

/**
 * Creates an Employer User
 * @param {String} email the email of the Employer
 * @param {String} password the password of the Employer
 * @param {String} companyName the name of the company this Employer represents
 * @param {Function} callback the callback function that sends the Employer User in the form
 * 								(err, Employer)
 */
EmployerSchema.statics.createEmployer = function(email, password, companyName, callback) {
	companyEmployerDoesntExist(companyName, function(err, result) {
		if (result) {
			User.addUser(email, password, false, function(errMsg, user) {
				if (errMsg) {
					callback(errMsg);
				} else {
					Employer.create({
						user : user._id,
						company : companyName,
						verified : false
					}, function(err, employer) {
						if (err) {
							callback(err.message);
						} else {
							callback(null, employer);
						}
					});
				}
			});
		} else {
			callback("An employer for this company already exists.");
		}
	});
}; 


/**
 * Finds the Employer associated with the userId
 * @param{ObjectId} userId
 * @param{Function} callback(err, Employer)
 */
EmployerSchema.statics.findByUserId = function(userId, callback) {
	Employer.findOne({ "user" : userId }, function(err, employer) {
		if (err) {
			callback(err.message);
		} else if (!employer) {
			callback("Employer does not exist.");
		} else {
			callback(null, employer);
		}
	});
}; 



/**
 * Changes employer verification to be true
 * @param {Object} employerId the ID of the employer
 * @param {Object} callback the call back in the form (err, updatedemployer)
 */
EmployerSchema.statics.verifyEmployer = function(userId, callback){
	Employer.findOneAndUpdate({user: userId}, {$set: {verified: true}}, function(err, employer) {
		if (err) {
			callback(err.message);
		} else if (!employer) {
			callback("Employer does not exist.");
		} else {
			// finding to get the actual updated version of Employer (we found that
			// the student in the callback of findOneAndUpdate isn't updated yet)
			Employer.findOne({ user : userId }, function(err, employer) {
				if (err) {
					callback(err.message);
				} else if (!employer) {
					callback("Employer does not exist.");
				} else {
					callback(null, employer);
				}
			});
		}
	});
};

/**
 * Finds the Employer associated with the company, and sends true if couldn't 
 * find an Employer of that company
 *
 * @param{String} company the name of the company
 */
var companyEmployerDoesntExist = function(company, callback){
	Employer.find({"company": company}, function(err, employer) {
		if (employer.length > 0) {
			callback(null, false);
		} else {
			callback(null, true);
		}
	});
};

var Employer = mongoose.model('Employer', EmployerSchema);
module.exports = mongoose.model("Employer", EmployerSchema);