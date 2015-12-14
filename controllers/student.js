/**
 * @author: Lynda Tang
 */
var Student = require('../models/Student.js');
var utils = require('../utils/utils');
require('../constants.js');

/**
 * POST /users/students
 * Adds an Employer to the Database
 * 
 * Request parameters:
 * 		-email: the inputed email of the Employer
 * 		-password: the inputed password of the Employer
 * 
 * Response:
 * 		-success: true if the server succeeded in adding to Student
 * 		-err: on failure (i.e failed in adding Student), an error message
 */
module.exports.createStudent = function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
	if (password.length < MIN_PASSWORD_LENGTH) {
		utils.sendErrResponse(res, 403, "Password needs to be at least " + MIN_PASSWORD_LENGTH + " characters");
	} else {
		Student.createStudent(email, password, function(errMsg, student) {
			if (errMsg) {
				utils.sendErrResponse(res, 403, errMsg);
			} else {
				var currUser = {
					userId : student.user,
					studentInfo : {
						commonFilled : student.commonFilled,
						_id : student._id
					}
				};
				req.session.user = currUser;
				utils.sendSuccessResponse(res);
			}
		});
	}
}; 

