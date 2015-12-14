/**
 * @author: Maddie Dawson and Jennifer Wu
 */
var Custom = require('../models/custom.js');
var Common = require('../models/common.js');
var Listing = require('../models/listing.js');
var utils = require('../utils/utils');
var async = require('async');
require('../constants.js');

/**
 * GET /employers/customs/:lstgid/:userid
 *
 * Gets the application (both the common and custom) submitted to listing 
 * lstgid by user with userid if the lstgid belongs to the currentUser
 *
 * Request body:
 *  - userid: the user id of the student who applied to the listing
 *  - lstgid: the id of the listing that the student applied to
 * 
 * Response:
 *  - success: true if succeeded in getting the common and custom
 *  - err: if had errors getting one or more of these
 */
exports.getFullApplication = function(req, res, next) {
	var currentUser = req.session.user;
	var employerId = currentUser.employerInfo._id;
	var listingId = req.body.listingId;
	var userId = req.body.userId;

	// check that the listing belongs to the user
	Listing.doesEmployerOwnListing(employerId, listingId, function(errMsg, employerOwns) {
		if (errMsg) {
			utils.sendErrResponse(res, 403, errMsg);
		} else if (!employerOwns)
			utils.sendErrResponse(res, 403, "Must own listing to view the application.");
		else {
			var commonResult;
			var customResult;
			var failedTask = false;

			// get the common application
			var getCommonTask = function(callback) {
				Common.getCommonByOwnerId(userId, function(errMsg, common) {
					if (errMsg || !common) {
						failedTask = true;
						callback();
					}
					common.populateCommon(function(errMsg, common) {
						if (errMsg) {
							failedTask = true;
						} else if (!common) {
							failedTask = true;
						} else {
							commonResult = common;
						}
						callback();
					});
				});
			};

			// get the custom application
			var getCustomTask = function(callback) {
				Custom.getByOwnerAndListing(userId, listingId, false, function(errMsg, custom) {
					if (errMsg || !custom || (custom.state !== "subm" && custom.state !== "star")) {
						failedTask = true;
						callback();
					}
					custom.populateCustom(function(errMsg, custom) {
						if (errMsg) {
							failedTask = true;
						} else if (!custom) {
							failedTask = true;
						} else {
							customResult = custom;
						}
						callback();
					});
				});
			};

			// get common and custom in parallel
			async.parallel([getCommonTask, getCustomTask], function() {
				if (failedTask) {
					utils.sendErrResponse(res, 403, "Common or custom does not exist.");
				} else {
					var content = {
						"commonApp" : commonResult.application,
						"listing" : customResult.listing,
						"state" : customResult.state,
						"customApp" : customResult.application,
						"owner" : customResult.owner,
						"isTemplate" : customResult.isTemplate,
						"submitTime" : customResult.submitTime,
						"customId" : customResult._id
					};
					utils.sendCsurfSuccessResponse(res, content, req.csrfToken());
				}
			});
		}
	});
};

/**
 * GET /employers/customs/:lstgid
 *
 * Retrieves applicants that have submitted to a given listing 
 * and their associated information for the employer applicants page
 *
 * Request body:
 *	- listingId: listing ID for relevant listing
 *
 * Response:
 *	- success: true if succeeded in retrieving applicants
 *	- err: on failure (i.e. server fail, invalid listing)
 */ 
exports.getApplicants = function(req, res, next) {
	var currentUser = req.session.user;
	var employerId = currentUser.employerInfo._id;
	var listingId = req.body.listingId;

	// check if listing belongs to employer
	Listing.doesEmployerOwnListing(employerId, listingId, function(errMsg, employerOwns) {
		if (errMsg) {
			utils.sendErrResponse(res, 403, errMsg);
		} else if (!employerOwns) {
			utils.sendErrResponse(res, 403, "Cannot get applicants if not the owner of the listing.");
		} else {
			// get the customs for the listing if the employer owns the listing
			Custom.getStarOrSubmByListing(listingId, function(errMsg, customs) {
				if (errMsg) {
					utils.sendErrResponse(res, 403, errMsg);
				} else {
					var customOwnerInfos = {};

					// attach the needed custom info for the listing page
					customs.forEach(function(custom) {
						customOwnerInfos[custom.owner] = {
							"_id" : custom._id,
							"isStar" : custom.state === "star",
							"submitTime" : custom.submitTime
						};
					});

					// get information to display on page according to headers
					Common.getCommonInfoForApplicantDisplay(customOwnerInfos, function(errMsg, usersCommonInfo) {
						if (errMsg) {
							utils.sendErrResponse(res, 403, errMsg);
						} else {
							var headers = Common.getHeadersForApplicantList();
							var content = {
								headers : headers,
								applicants : usersCommonInfo
							};
							utils.sendCsurfSuccessResponse(res, content, req.csrfToken());
						}
					});
				}
			});
		}
	});
}; 


/**
 * PUT /employers/customs/starred/:customid
 *
 * Marks a custom application as starred
 *
 * Request body:
 *  - customId: custom ID for to-be-starred custom
 *  - listingId: listing ID corresponding to the listing of the custom
 *
 * Response:
 *	- success: true if succeeded in changing custom state
 *	- err: on failure (i.e. server fail, invalid custom)
 */
exports.starCustom = function(req, res, next) {
	var currentUser = req.session.user;
	var employerId = currentUser.employerInfo._id;
	var listingId = req.body.listingId;
	var customId = req.body.customId;

	checkIfCustomOfEmployer(employerId, customId, listingId, function() {
		Custom.star(customId, function(errMsg, custom) {
			if (errMsg) {
				utils.sendErrResponse(res, 403, errMsg);
			} else if (!custom) {
				utils.sendErrResponse(res, 403, "Custom does not exist.");
			} else {
				utils.sendSuccessResponse(res);
			}
		});
	});		
};

/**
 * PUT /employers/customs/unstarred/:customid
 *
 * Marks a custom application as unstarred
 *
 * Request body:
 *  - customId: custom ID for to-be-unstarred custom
 *  - listingId: listing ID corresponding to the listing of the custom
 *
 * Response:
 *	- success: true if succeeded in changing custom state
 *	- err: on failure (i.e. server fail, invalid custom)
 */
exports.unstarCustom = function(req, res, next) {
	var currentUser = req.session.user;
	var employerId = currentUser.employerInfo._id;
	var listingId = req.body.listingId;
	var customId = req.body.customId;

	checkIfCustomOfEmployer(employerId, customId, listingId, function() {
		Custom.unstar(customId, function(errMsg, custom) {
			if (errMsg) {
				utils.sendErrResponse(res, 403, errMsg);
			} else if (!custom) {
				utils.sendErrResponse(res, 403, "Custom does not exist.");
			} else {
				utils.sendSuccessResponse(res);
			}
		});
	});
}; 


/**
 * PUT /employers/customs/rejected/:customid
 *
 * Marks an custom application as rejected
 *
 * Request body:
 *  - customId: custom ID for to-be-rejected custom
 *  - listingId: listing ID corresponding to the listing of the custom
 *
 * Response:
 *	- success: true if succeeded in changing custom state
 *	- err: on failure (i.e. server fail, invalid custom)
 */
exports.rejectCustom = function(req, res, next) {
	var currentUser = req.session.user;
	var employerId = currentUser.employerInfo._id;
	var listingId = req.body.listingId;
	var customId = req.body.customId;

	checkIfCustomOfEmployer(employerId, customId, listingId, function() {
		Custom.reject(customId, function(errMsg, custom) {
			if (errMsg) {
				utils.sendErrResponse(res, 403, errMsg);
			} else if (!custom) {
				utils.sendErrResponse(res, 403, "Custom does not exist.");
			} else {
				utils.sendSuccessResponse(res);
			}
		});
	});
};

/**
 * GET /students/customs
 *
 * Retrieves all student customs
 *
 * Response:
 *  - success: true if succeeded in changing application state
 *	- err: on failure (i.e. server fail)
 */
exports.getAllStudentCustoms = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled) {
		utils.sendErrResponse(res, 403, "Common application not filled, cannot complete request.");
	} else {
		var userId = req.session.user.userId;

		Custom.getByOwners(userId, function(errMsg, customs) {
			if (errMsg) {
				utils.sendErrResponse(res, 403, errMsg);
			} else if (!customs) {
				utils.sendErrResponse(res, 403, "Could not get applications.");
			} else {
				var listingIds = [];
				customs.forEach(function(custom) {
					listingIds.push(custom.listing);

					// change any starred custom states to normal submitted
					custom.state = (custom.state === "star") ? "subm" : custom.state;
				});

				var content = {
					applications : customs
				};
				utils.sendSuccessResponse(res, content);
			}
		});
	}
}; 


/**
 * GET /students/customs/:lstgid
 *
 * Gets the custom application associated with the lstgid for the 
 * current User
 * 
 * Request body:
 *	- lstgid: listingId of the listing's whose Custom we need
 *
 * Response:
 *  - success: true if succeeded got the custom
 *  - err: on failure (i.e. server failure, invalid user);
 */
exports.getCustom = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled) {
		utils.sendErrResponse(res, 403, "Common application not filled, cannot complete request.");
	} else {

		var currentUser = req.session.user;
		var userId = currentUser.userId;
		var listingId = req.body.listingId;

		Custom.getByOwnerAndListing(userId, listingId, true, function(errMsg, custom) {
			if (errMsg) {
				utils.sendErrResponse(res, 403, errMsg);
			} else if (!custom) {
				utils.sendErrResponse(res, 403, "Custom does not exist.");
			} else {
				custom.populateCustom(function(errMsg, custom) {
					if (errMsg) {
						utils.sendErrResponse(res, 403, errMsg);
					} else if (!custom) {
						utils.sendErrResponse(res, 403, "Custom does not exist.");
					} else {

						var content = {
							"listing" : custom.listing,
							"state" : (custom.state === "star") ? "subm" : custom.state, // so student doesn't know if application has been starred
							"application" : custom.application,
							"owner" : custom.owner,
							"isTemplate" : custom.isTemplate,
							"submitTime" : custom.submitTime,
							"_id" : custom._id
						};
						utils.sendCsurfSuccessResponse(res, content, req.csrfToken());
					}
				});
			}
		});
	}
}; 


/**
 * POST /students/customs/:lstgid
 *
 * Save the empty custom template associated wtih the listingId
 *
 * Request body:
 *  - listingId: the listing ID of the relevant listing
 *
 * Response:
 *	- success: true if succeeded in submitting
 *	- err: on failure (i.e. server fail, invalid submission, invalid custom)
 */ 
exports.addCustom = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled) {
		utils.sendErrResponse(res, 403, "Common application not filled, cannot complete request.");
	} else {

		var userId = req.session.user.userId;
		var listingId = req.body.listingId;

		Custom.copyTemplateToSave(listingId, userId, function(errMsg, custom) {
			if (errMsg) {
				utils.sendErrResponse(res, 403, errMsg);
			} else if (!custom) {
				utils.sendErrResponse(res, 403, "Could not save application.");
			} else {
				utils.sendSuccessResponse(res);
			}
		});
	}
}; 


/**
 * PUT /students/customs/submitted/:customid
 *
 * Submits answers for the custom associated with customId so long as 
 * the max number of submits has not already been reached
 *
 * Request body:
 *	- answers: Object with keys that are "_id" (mapping to questionId)
 *			and "answer" (mapping to a string)
 *  - customId: the custom ID of the relevant custom
 *
 * Response:
 *	- success: true if succeeded in submitting
 *	- err: on failure (i.e. server fail, invalid submission, invalid custom)
 */ 
exports.submitCustom = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled) {
		utils.sendErrResponse(res, 403, "Common application not filled, cannot complete request.");
	} else {
		var userId = req.session.user.userId;
		var customId = req.body.customId;
		var answers = req.body.answers;
		
		// format answers for model call
		var answerArray = [];
		Object.keys(answers).forEach(function(id) {
	        answerArray.push({
	          "_id" : id,
	          "answer" : answers[id]
	        });
	    });
	
		// check that the current user is the owner of the application
		checkIfCustomOfUser(userId, customId, function(custom) {
			Listing.getByListingId(custom.listing, function(err, listing) {
				// check that the user isn't trying to submit anything that is passed deadline
				if (new Date(listing.deadline) < Date.now()) {
					utils.sendErrResponse(res, 403, "Cannot submit because it is passed the deadline.");
				} else {
					// check that current user hasn't exceeded the maximum number of submits allowed
					Custom.numCustomsPerStateForOwner(userId, function(errMsg, numPerState) {
						if (errMsg) {
							utils.sendErrResponse(res, 403, errMsg);
						} else {
							// check that max number of submissions hasn't been reached
							if (numPerState.subm + numPerState.star >= MAX_NUMBER_SUBMISSIONS) {
								utils.sendErrResponse(res, 403, "Reached max number of submissions.");
							} else {
								
								Custom.update(customId, answerArray, true, function(errMsg, custom) {
									if (errMsg) {
										utils.sendErrResponse(res, 403, errMsg);
									} else if (!custom) {
										utils.sendErrResponse(res, 403, "Could not submit custom application.");
									} else {
										utils.sendSuccessResponse(res);
									}
								}); 
							}
						}
					});
				}
			});
		});
	}
};

/**
 * PUT /students/customs/saved/:customid
 *
 * Saves the answers for the custom associated wtih customId
 *
 * Request body:
 *	- answers: Object with keys that are "_id" (mapping to questionId)
 *			and "answer" (mapping to a string)
 *  - customId: the custom ID of the relevant custom
 *
 * Response:
 *	- success: true if succeeded in submitting
 *	- err: on failure (i.e. server fail, invalid update, invalid custom)
 */ 
exports.saveCustom = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled) {
		utils.sendErrResponse(res, 403, "Common application not filled, cannot complete request.");
	} else {
		var userId = req.session.user.userId;
		var customId = req.body.customId;
		var answers = req.body.answers;

		// format answers for model call
		var answerArray = [];
		Object.keys(answers).forEach(function(id) {
			answerArray.push({
				"_id" : id,
				"answer" : answers[id]
			});
		});

		// check that the current user is the owner of the application
		checkIfCustomOfUser(userId, customId, function() {
			Custom.update(customId, answerArray, false, function(errMsg, custom) {
				if (errMsg) {
					utils.sendErrResponse(res, 403, errMsg);
				} else if (!custom) {
					utils.sendErrResponse(res, 403, "Could not save custom application.");
				} else {
					utils.sendSuccessResponse(res);
				}
			});
		});
	}
};

/**
 * PUT /students/customs/withdrawn/:customid
 *
 * Withdraws the custom associated with customId
 *
 * Request body:
 *	- customId : custom ID for to-be-rejected custom
 *
 * Response:
 *	- success: true if succeeded in withdrawal
 *	- err: on failure (i.e. server fail, invalid withdrawal, invalid custom)
 */ 
exports.withdrawCustom = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled) {
		utils.sendErrResponse(res, 403, "Common application not filled, cannot complete request.");
	} else {
		var currentUser = req.session.user;
		var userId = currentUser.userId;
		var customId = req.body.customId;

		checkIfCustomOfUser(userId, customId, function() {
			Custom.withdraw(customId, function(errMsg, custom) {
				if (errMsg) {
					utils.sendErrRsponse(res, 403, errMsg);
				} else if (!custom) {
					utils.sendErrRsponse(res, 403, "Custom does not exist.");
				} else {
					utils.sendSuccessResponse(res);
				}
			});
		});
	}
}; 


/**
 * DELETE /students/customs/:customid
 *
 * Deletes the custom associated with the customId
 *
 * Request body:
 *	- customId : custom ID for to-be-rejected custom
 *
 * Response:
 *	- success: true if succeeded in deleting
 *	- err: on failure (i.e. server fail, invalid deletion, invalid custom)
 */ 
exports.deleteCustom = function(req, res, next) {
	if (!req.session.user.studentInfo.commonFilled) {
		utils.sendErrResponse(res, 403, "Common application not filled, cannot complete request.");
	} else {
		var currentUser = req.session.user;
		var userId = currentUser.userId;
		var customId = req.body.customId;

		checkIfCustomOfUser(userId, customId, function() {
			Custom.deleteSavedCustom(customId, function(errMsg, custom) {
				if (errMsg) {
					utils.sendErrRsponse(res, 403, errMsg);
				} else {
					utils.sendSuccessResponse(res);
				}
			});
		});
	}
}; 

/**
 * Runs callIfTrue if the custom associated with the customId corresponds to
 * the listing associated with listingId AND if the listing associated with
 * listingId belongs to the employer associated with employerId
 * 
 * @param{ObjectId} employerId
 * @param{ObjectId} customId
 * @param{ObjectId} listingId
 * @param{Function} callIfTrue()
 */
var checkIfCustomOfEmployer = function(employerId, customId, listingId, callIfTrue) {
	Listing.doesEmployerOwnListing(employerId, listingId, function(errMsg, employerOwns) {
		if (errMsg) {
			utils.sendErrResponse(res, 403, errMsg);
		} else if (!employerOwns) {
			utils.sendErrResponse(res, 403, "Must own listing to continue.");
		} else {
			Custom.getStarOrSubmCustomIfListing(customId, listingId, function(errMsg, custom) {
				if (errMsg) {
					utils.sendErrResponse(res, 403, errMsg);
				} else if (!custom) {
					utils.sendErrResponse(res, 403, "Custom does not exist.");
				} else {
					callIfTrue();
				}
			});
		}
	});
}; 


/**
 * Runs callIfTrue on the custom belonging associated with the userId and customId
 * if the customassociated with the customId has an owner that is the User 
 * corresponding to the userId
 * 
 * @param{ObjectId} userId
 * @param{ObjectId} customId
 * @param{Function} callIfTrue(custom)
 */
var checkIfCustomOfUser = function(userId, customId, callIfTrue) {
	Custom.getIfOwner(userId, customId, function(errMsg, custom) {
		if (errMsg) {
			utils.sendErrResponse(res, 403, errMsg);
		} else if (!custom) {
			utils.sendErrResponse(res, 403, "Custom does not exist.");
		} else {
			callIfTrue(custom);
		}
	});
}; 
