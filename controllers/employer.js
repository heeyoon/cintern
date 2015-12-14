/**
 * @author Lynda Tang
 */
var Employer = require('../models/Employer.js');
var utils = require('../utils/utils');
var mandrill = require('mandrill-api/mandrill');
var jwt  = require('jsonwebtoken');
var config = require('../config');

/**
 * POST /users/employers
 * Adds an Employer to the Database
 * 
 * Request parameters:
 * 		-email: the inputed email of the Employer
 * 		-password: the inputed password of the Employer
 * 		-company: the inputed company of the Employer
 * 
 * Response:
 * 		-success: true if the server succeeded in adding the Employer
 * 		-err: on failure (i.e failed in adding Employer), an error message
 */
module.exports.createEmployer = function(req, res, next){
	var email = req.body.email;
	var password = req.body.password;
	var company = req.body.company;

	if (password.length < MIN_PASSWORD_LENGTH) {
		utils.sendErrResponse(res, 403, "Password needs to be at least " + MIN_PASSWORD_LENGTH + " characters");
	} else {
		Employer.createEmployer(email, password, company, function(errMsg, employer) {
			if (errMsg) {
				utils.sendErrResponse(res, 403, errMsg);
			} else {
				// send email to verify the new employer creation
				var token = jwt.sign(employer, config.secret, {});
				sendVerificationMail(email, company, token, function(err, response){
					if (err) {
						utils.sendErrResponse(res, 403, err.message);
					} else {
						var currUser = {
							userId : employer.user,
							employerInfo : {
								company : employer.company,
								_id : employer._id,
								verified: employer.verified,
							}
						};
						req.session.user = currUser;
						utils.sendSuccessResponse(res);
					}
				});
			}
		});
	}
};

/**
 * POST /users/verify
 * Verifies the employer with a given token
 *
 * Request parameters: 
 * 		-token: token needed to run verification
 * 
 * Response:
 * 		-success: if token is correct, and employer successfully verified
 *		-err: on failure (i.e. invalid token)
 */
module.exports.verifyEmployer = function(req, res, next){
	//Gets the token
	var token = req.body.token || req.query.token || req.headers['token'];
	if (token){
		jwt.verify(token, config.secret , function(err, decodedres) {
        	if(err) {
        		utils.sendErrResponse(res, 403, err.message);
        		console.log(err);
        	} else {
        		//Verifies the employer that the token is assigned to
        		Employer.verifyEmployer(decodedres.user, function(err, employer) {
        			utils.sendSuccessResponse(res);
        		});
        	}
        });
	}
};

/**
 * Sends a verification email to the cintern admin
 * cintern admin email: cintern1234@gmail.com
 * cintern password: 1234cintern
 * 
 * @param {Object} email the email of the employer request
 * @param {Object} company the company of the employer request
 * @param {Object} token the token of the employer request
 * @param {Object} callback the callback function
 */
var sendVerificationMail = function(email, company, token, callback){
	/////////////////////////////////////////////////////////////////////
	// From Mandrill API Example: https://mandrillapp.com/api/docs/messages.JSON.html
	/////////////////////////////////////////////////////////////////////
	
	mandrill_client = new mandrill.Mandrill('ebssNtNrdCzIamvsaEANag');
	var message = {
	    "html": "Verification for email: " + email + " company: " + company + 
	        "<br>If testing on heroku, please click the following link:" + 
	    	"<br><a href = 'cintern.herokuapp.com/users/verify?token=" + token + "'>Verify employer</a>" + 
	    	"<br><br>If testing on local, please put this link into your browser: " + 
	    	"<br>localhost:3000/users/verify?token=" + token,
	    "subject": "Employer Request",
	    "from_email": "message.employer-verification@cintern.com",
	    "from_name": "Cintern",
	    "to": [{
            "email": ADMIN_EMAIL,
            "name": "Cintern Admin",
            "type": "to"
        }],
	    "important": false,
	    "track_opens": null,
	    "track_clicks": null,
	    "auto_text": null,
	    "auto_html": null,
	    "inline_css": null,
	    "url_strip_qs": null,
	    "preserve_recipients": null,
	    "view_content_link": null,
	    "tracking_domain": null,
	    "signing_domain": null,
	    "return_path_domain": null,
	    "merge": false,
	};
	
	var async = false;
	var ip_pool = "Main Pool";
	
	mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
		callback(null);
	}, function(e) {
	    callback('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	});
};