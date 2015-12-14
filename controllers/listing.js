/** 
 * @author Heeyoon Kim
 */
var Listing = require('../models/listing.js');
var Custom = require('../models/custom.js');
var utils = require('../utils/utils');

/**
 * GET /employers/listings
 *
 * Retrieves all of the listings that the employer has created
 *
 * Request body:
 *  - employerId: id of the employer (given only if currentUser is a student; otherwise, use the id of 
 *				  the currently logged in user)
 *
 * Response:
 *  - success: true if successfully retrieved the employer's listings
 *  - err: if failed to retrieve
 */
exports.getEmployerListings = function(req, res, next) {
	var currentUser = req.session.user;
	var employerId = currentUser.employerInfo._id;

	Listing.getAllEmployerListings(employerId, function(errMsg, listings) {
		if (errMsg) {
			utils.sendErrResponse(res, 403, errMsg);
		} else if (!listings) {
			utils.sendErrResponse(res, 403, "No listings.");
		} else {
			var listingIds = listings.map(function(listing) {
				return listing._id;
			});

			// find how many submitted or starred customs there are per listing
			Custom.numCustomsPerListing(listingIds, function(err, numApplicantsMap) {
				if (err) {
					utils.sendErrResponse(res, 403, err);
				} else if (!numApplicantsMap) {
					utils.sendErrResponse(res, 403, "No listings.");
				} else {
					var content = {
						"numApplicantsMap" : numApplicantsMap,
						"listings" : listings
					};
					utils.sendCsurfSuccessResponse(res, content, req.csrfToken());
				}
			});
		}
	});
}; 

/**
 * POST employers/listings
 * 
 * Creates a new listing with a new template
 * 
 * Request body: 
 *	- employerId: id of the employer
 *	- title: title or position advertised
 *	- description: description of the listing
 *	- requirements: requirements the student should have
 *	- deadline: the date that the application is due
 *	- questions: array of question objects 
 *
 * Response: 
 * 	- success: true if succeeded in creating listing
 *	- err: on failure (i.e. server fail)
 */
exports.createListing = function(req, res, next) {
	var currentUser = req.session.user;
	var employerId = currentUser.employerInfo._id;
	var title = req.body.title;
	var desc = req.body.description;
	var reqs = req.body.requirements;
	var deadline = req.body.deadline;
	var questions = req.body.questions;

	// format deadline to 11:59PM server time
	var deadline = new Date(deadline);
	var day = deadline.getDate();
	var month = deadline.getMonth();
	var year = deadline.getFullYear();
	deadline = new Date(year, month, day, 23, 59, 59, 59);

	// check that the deadline is appropriate
	if (new Date(deadline) < Date.now()) {
		utils.sendErrResponse(res, 403, "Selected deadline has passed.");
	} else {
		var questionList = [];
		questions.forEach(function(question) {
			questionList.push({
				"question" : question.question,
				"type" : question.type,
				"required" : question.required
			});
		});

		Listing.createListing(employerId, title, desc, reqs, deadline, function(errMsg, listing) {
			if (errMsg) {utils.sendErrResponse(res, 403, errMsg);}
			else if (!listing) {utils.sendErrResponse(res, 403, "Could not create listing.");}
			else {
				// create the template belonging to the new listing
				Custom.createTemplate(listing._id, questionList, currentUser.userId, function(errMsg, template) {
					if (errMsg) {utils.sendErrResponse(res, 403, errMsg);}
					else if (!template) {utils.sendErrResponse(res, 403, "Could not create template.");}
					else {utils.sendSuccessResponse(res);}
				});
			}
		});	
	}
};

/**
 * DELETE /employers/listings/:lstgid
 * 
 * Deletes the listing with lstgid and the associated templates
 * and the associated applications
 * 
 * Request body:
 *	- listingId: the id of the listing to delete
 * 
 * Response:
 * 	- success: true if successfully deleted listing
 *  - err: if failed to delete
 */
exports.deleteListing = function(req, res, next) {
	var listingId = req.body.listingId;
	var currentUser = req.session.user;
	// check that the listing belongs to the employer
	Listing.doesEmployerOwnListing(currentUser.employerInfo._id, listingId, function(errMsg, employerOwns) {
		if (errMsg) {
			utils.sendErrResponse(res, 403, errMsg);
		} else if (!employerOwns) {
			utils.sendErrResponse(res, 403, "Listings can only be deleted by their owners.");
		} else {
			Custom.deleteByListing(listingId, function(errMsg) {
				if (errMsg) {
					utils.sendErrResponse(res, 403, errMsg);
				} else {
					Listing.deleteListing(listingId, function(errMsg) {
						if (errMsg) {
							utils.sendErrResponse(res, errMsg);
						} else {
							utils.sendSuccessResponse(res);
						}
					});
				}
			});
		}
	});
}; 

/**
 * GET /students/listings
 *
 * Retrieves all the listings available on the site and whose deadlines haven't passed
 * Also generates a list of listing IDs that the student has already 
 * applied to to make sure the student does not reapply
 *
 * Request body:
 *  None
 *
 * Response:
 *  - success: true if successfully retrieved all listings
 *  - err: if failed to retrieve
 */
exports.getAllCurrentListings = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled) {
		utils.sendErrResponse(res, 403, "Common application not filled, cannot complete request.");
	} else {
		Listing.getAllCurrentListings(function(errMsg, listings) {
			if (errMsg) {
				utils.sendErrResponse(res, 403, errMsg);
			} else if (!listings) {
				utils.sendErrResponse(res, 403, "No listings.");
			} else {
				// get the customs belonging to the user
				Custom.getByOwners(req.session.user.userId, function(err, userCustoms) {
					if (err) {
						utils.sendErrResponse(res, 403, err);
					} else {
						// filter out the listings of the user customs
						var userListings = userCustoms.map(function(custom) {
							return custom.listing._id;
						});

						var content = {
							"listings" : listings,
							"userListings" : userListings
						};
						utils.sendSuccessResponse(res, content);
					}
				});
			}
		});
	}
}; 

/**
 * GET /students/listings/:lstgid
 *
 * Retrieves the details of the listing with id listgid
 *
 * Request body:
 *  - listingId: the id of the listing to retrieve
 *
 * Response:
 *  - success: true if successfully retrieved some information about that listing
 *  - err: if failed to retrieve any information, or there was an error with the query
 */
exports.getListing = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled) {
		utils.sendErrResponse(res, 403, "Common application not filled, cannot complete request.");
	} else {
		var listingId = req.body.listingId;

		// get the listing
		Listing.getByListingId(listingId, function(errMsg, listing) {
			if (errMsg) {
				utils.sendErrResponse(res, 403, errMsg);
			} else if (!listing) {
				utils.sendErrResponse(res, 403, "Listing does not exist.");
			} else {
				// get the template for the listing
				Custom.getListingTemplate(listingId, function(errMsg, customTemplate) {
					if (errMsg) {
						utils.sendErrResponse(res, 403, errMsg);
					} else if (!customTemplate) {
						utils.sendErrResponse(res, 403, "Template does not exist.");
					} else {
						customTemplate.populateCustom(function(errMsg, customTemplate) {
							var content = {
								"listing" : listing,
								"application" : customTemplate.application,
							};
							utils.sendCsurfSuccessResponse(res, content, req.csrfToken());
						});
					}
				});
			}
		});
	}
}; 