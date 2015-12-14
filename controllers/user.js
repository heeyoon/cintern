/**
 * @author: Lynda Tang
 */
var User = require('../models/User.js');
var Student = require('../models/Student.js');
var Employer = require('../models/Employer.js');
var utils = require('../utils/utils');

/**
 * POST /users/login
 * Logins to a User
 * 
 * Request parameters:
 * 		-email: the inputed email 
 * 		-password: the inputed password 
 * 
 * Response:
 * 		-success: true if the server succeeded in login 
 * 		-err: on failure (i.e failed in adding Student), an error message
 */
module.exports.login = function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
	User.loginUser(email, password, function(errMsg, user) {
		if (errMsg) {
			utils.sendErrResponse(res, 403, errMsg);
		} else {
			req.brute.reset(function() {
				if (user.isStudent) {
					// find student and login student
					Student.findByUserId(user._id, function(errMsg, student) {
						if (errMsg) {
							utils.sendErrResponse(res, 403, errMsg);
						} else {
							var currUser = {
								userId : user._id,
								studentInfo : {
									commonFilled : student.commonFilled,
									_id : student._id
								}
							};
							req.session.user = currUser;
							utils.sendSuccessResponse(res);
						}
					});
				} else {
					// find employer and login employer
					Employer.findByUserId(user._id, function(errMsg, employer) {
						if (errMsg) {
							utils.sendErrResponse(res, 403, errMsg);
						} else {
							var currUser = {
								userId : user._id,
								employerInfo : {
									company : employer.company,
									_id : employer._id,
									verified : employer.verified,
								}
							};
							req.session.user = currUser;
							utils.sendSuccessResponse(res);
						}
					});
				}
			});
		}
	});
}; 


/**
 * POST /users/logout
 * Logouts of a User
 * 
 * Request parameters:
 * 
 * Response:
 * 		-success: true if the server succeeded in logging out the User
 * 		-err: on failure (i.e failed in adding Student), an error message
 */
module.exports.logout = function(req, res, next) {
	if (req.session.user) {
		req.session.destroy();
		utils.sendSuccessResponse(res);
	} else {
		utils.sendErrResponse(res, 403, "No one is logged in.");
	}
}; 
