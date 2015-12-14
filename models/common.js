/**
 * This model represents the Common Application, which Students must fill
 * out before being able to apply to companies. The Common refers to the 
 * corresponding Application which contains the Common Application questions,
 * along with answers if the Student filled it out. The owner of the Common App 
 * is the student who filled it out.
 *
 * Rep invariant: A common has a non-empty application (i.e. a set of questions)
 *				  that are the same throughout all common applications and an 
 *				  existent owner that is a user
 *
 * @author Jennifer Wu
 */
var mongoose = require("mongoose");
var Application = require("../models/application");
var Data = require("../data/common");

// Common schema definition
var commonSchema = mongoose.Schema({
	"application" : { 
		type : mongoose.Schema.Types.ObjectId, 
		ref: "Application", 
		required : true, 
		immutable : true, 
		unique : true 
	},
	"owner" : { 
		type : mongoose.Schema.Types.ObjectId, 
		ref: "User",
		required : true, 
		immutable : true, 
		unique : true 
	}
});

/**
 * @return the headers for the applicant listing page
 */
commonSchema.statics.getHeadersForApplicantList = function() {
	return Object.keys(Data.getApplicantHeaderInfo());
};

/**
 * Runs the callback on an array of Objects that contain the appropriate
 * information for the applicant display and with the same info in
 * customOwnerInfos
 *
 * @param{Array} customOwnerInfos a list of Objects mapping userIds to
 * 		an Object that has information about the user
 * @param{Function} callback(err, array)
 */
commonSchema.statics.getCommonInfoForApplicantDisplay = function(customOwnerInfos, callback) {
	var userIds = Object.keys(customOwnerInfos);

	var info = [];

	Common.find({ "owner": { $in: userIds } }).populate("application").exec(function(err, commons) {
		if (err) {
			callback(err.message);
		} else {
			commons.forEach(function(common) {
				var questions = common.application.questions;
				var commonInfo = {};

				// get the information for the headers supplied in applicantHeaderInfo
				var applicantHeaderInfo = Data.getApplicantHeaderInfo();
				forEachKey(applicantHeaderInfo, function(header) {
					questions.forEach(function(question) {
						if (applicantHeaderInfo[header] === question.question) {
							commonInfo[header] = question.answer;
						}
					});
				});

				commonInfo["owner"] = common.owner;

				// maintain the information from customOwnerInfo
				forEachKey(customOwnerInfos[common.owner], function(key) {
					commonInfo[key] = customOwnerInfos[common.owner][key];
				});

				info.push(commonInfo);
			});
			callback(null, info);
		}
	});
};

/**
 * Creates a common with owner ownerId as well as the Application with 
 * the questions that are from the Data file, then runs the callback
 * on the created common
 *
 * @param{ObjectId} ownerId
 * @param{Function} callback(err, Common);
 */
commonSchema.statics.createCommon = function(ownerId, callback){
	Application.createApplication(Data.getCommonQuestions(), function(errMsg, app) {
		if (errMsg) {
			callback(errMsg);
		} else if (!app) {
			callback("Application for Common could not be created.");
		} else {
			var common = {
				"application" : app._id,
				"owner" : ownerId
			};
			var newCommon = new Common(common);

			// save the new app in the DB
			newCommon.save(function(err, newCommon) {
				if (err) {
					callback(err.message);
				} else {
					callback(null, newCommon);
				}
			});
		}
	}); 
};

/**
 * Submits answers for the common application with owner userId, and 
 * runs the callback on a Boolean that is true if the submission was 
 * successful, and false if the submission was not successful
 *
 * @param{ObjectId} userId id of User that submits the common
 * @param{Array} answers is an Array of Objects with keys that is "id" 
 * 			(mapping to an Object id), and "answer" (mapping to a String)
 * @param{Function} callback(err, Boolean)
 */
commonSchema.statics.submitCommon = function(userId, answers, callback) {
	Common.findOne({ "owner" : userId }, function(err, common) {	
		if (err) {
			callback(err.message, false);
		} else if (!common) {
			callback("Common does not exist.", false);
		} else {
			Application.updateAnswers(common.application, answers, true, function(errMsg, app) {
				if (errMsg) {
					callback(errMsg, false);
				} else {
					callback(null, true);
				}
			});
		}
	});
};

/**
 * Runs callback on the Common with the owner that is ownerId
 *
 * @param{ObjectId} ownerId
 * @param{Function} callback(err, Common)
 */
commonSchema.statics.getCommonByOwnerId = function(ownerId, callback) {
	Common.findOne({ "owner" : ownerId }, function(err, common) {
		if (err) {
			callback(err.message);
		} else if (!common) {
			callback("Common does not exist.");
		} else {
			callback(null, common);
		}
	});
};

/**
 * Runs a callback on a Common Object whose application has been populated
 *
 * @param{Function} callback(err, Common) where Common has been populated
 */
commonSchema.methods.populateCommon = function(callback) {
	Application.populate(this, { path : 'application' }, function(err, common) {
		if (err) {
			callback(err.message);
		} else if (!common) {
			callback("Common does not exist.");
		} else {
			callback(null, common);
		}
	});
};

/**
 * Runs fn on each key of the obj
 *
 * @param{Object} obj
 * @param{Function} fn
 */
var forEachKey = function(obj, fn) {
	Object.keys(obj).forEach(function(key) {
		if (obj.hasOwnProperty(key)) {
			fn(key);
		}
	}); 
};

var Common = mongoose.model("Common", commonSchema);
module.exports = Common;

