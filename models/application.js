/**
 * This model represents the Application object (which is used in the Common 
 * and Custom models). Application creates a list of Questions, where each 
 * question is represented as a string and type of question. Each question 
 * has a default answer of the empty string, which means that the question
 * has not yet been answered. The question may also have options, given 
 * that the question is a dropdown.
 *
 * Rep invariant: Each question in an application has a textual question,
 *				  a type (text, dropdown, or radio), an indication of whether
 *				  or not the question is required to be answered, an answer,
 *				  a set of options. If the question is of type text or radio,
 *				  then the options of that question is empty. If the question 
 *				  of type radio, then required must be true and answer can 
 *				  only be the empty string, "yes", or "no". If the question
 *				  is of type dropdown, then options must be at least of length
 * 				  2 and answer can only be the empty string or a string in 
 *				  the options of that question. 
 *
 * @author Jennifer Wu
 */
var mongoose = require("mongoose");

// Application schema definition
var applicationSchema = mongoose.Schema({
	questions : [{
		"question" : { 
			type : String, 
			required : true, 
			immutable: true 
		},
		"type" : { 
			type : String, 
			required : true, 
			enum : [ "text", "dropdown", "radio" ], 
			immutable: true 
		},
		"required" : { 
			type : Boolean, 
			required : true, 
			immutable: true 
		},
		"answer" : { 
			type : String, 
			default : '' 
		},
		"options" : [{ 
			type : String, 
			immutable: true 
		}],
	}]
});

/**
 * Checks that any "dropdown" typed question has at least 2 options, checks that
 * any non-"dropdown" typed question have no options and that no wrongly formatted
 * answer is being saved
 */
applicationSchema.pre("save", function(next) {
	// check that each question has the appropriate type options relation
	this.questions.forEach(function(e) {
		if (e.type === "dropdown" && e.options.length < 2) {
			return next(new Error("Dropdown questions must have at least one option."));
		} else if (e.type !== "dropdown" && e.options.length !== 0) {
			return next(new Error("Non dropdown questions don't have options."));
		}
		if (e.type === "radio" && e.required !== true) {
			return next(new Error("Radio type questions must be required."));
		}
	});

	// check that all answers are correctly formatted
	var verificationObj = verifyAnsweredQuestionsCorrectly(this.questions);
	if (!verificationObj.success) {
		next(new Error(verificationObj.errMsg));
	}

	next(null, this);
}); 


/**
 * Creates an Application where questions are set as questions, 
 * and then runs the callback on the new Application
 *
 * @param{Array} questions is an Array of Objects with keys that are "question",
 * 		"type", "required", "options" and/or "answer"
 * @param{Function} callback(err, Application)
 */
applicationSchema.statics.createApplication = function(questions, callback) {
	var newApp = new Application({ "questions" : questions });

	// save the new app in the DB
	newApp.save(function(err, newApp) {
		if (err) {
			callback(err.message);
		} else {
			callback(null, newApp);
		}
	});
}; 


/**
 * Deletes the applications associated with the appIds and runs the callback
 *
 * @param{Array} appIds is an Array of ObjectIds
 * @param{Function} callback(err)
 */
applicationSchema.statics.deleteApplications = function(appIds, callback) {
	Application.remove({ "_id" : { $in : appIds } }, function(err) {
		if (err) {
			callback(err.message);
		} else {
			callback(null);
		}
	});
}; 


/**
 * Sets the application questions to answers and if isSubmission is true
 * checks if application can be submitted and update state appropriately, then 
 * run the callback
 *
 * @param{ObjectId} appId
 * @param{Array} answers is an Array of Objects with keys that is "id" 
 * 			(mapping to an Object id), and "answer" (mapping to a String)
 * @param{Boolean} isSubmission
 * @param{Function} callback(err, Application)
 */
applicationSchema.statics.updateAnswers = function(appId, answers, isSubmission, callback) {
	Application.findOne({ "_id" : appId }, { questions : 1 }, function(err, app) {
		if (err) {
			callback(err.message);
		} else if (!app) {
			callback("Application does not exist.");
		} else {
			// ready to update is true if answers is a submission and all required
			// questions have been correctly answered OR if answers is not a submission
			// and all answers are well formed answers to questions
			var verificationObj;
			if (isSubmission) {
				verificationObj = verifyForSubmissions(app.questions, answers);
			} else {
				verificationObj = verifyForUpdate(app.questions, answers);
			}

			// set each question's answer to the corresponding one in answers
			if (verificationObj.success) {
				app.questions.forEach(function(question, i) {
					app.questions[i].answer = answers[i].answer;
				});
				app.save(callback);
			} else {
				callback(verificationObj.errMsg);
			}
		}
	});
}; 


/**
 * Runs the callback on the Array of Objects that are the questions associated 
 * with the Application with appId in a specific format. The Object has keys 
 * "question", "type", "required", "options", and "answer"
 * 
 * @param{ObjectId} appId
 * @param{Function} callback(err, Array)
 */
applicationSchema.statics.formatForShow = function(appId, callback) {
	Application.findOne({ "_id" : appId }, function(err, app) {
		if (err) {
			callback(err.message);
		} else if (!app) {
			callback("Application does not exist.");
		} else {
			var formattedQuestions = [];
			app.questions.forEach(function(e) {
				formattedQuestions.push({
					"question" : e.question,
					"type" : e.type,
					"required" : e.required,
					"options" : e.options,
					"answer" : e.answer,
					"_id" : e._id
				});
			});
			callback(null, formattedQuestions);
		}
	});
};

/**
 * Checks if answers is okay for submission given origQuestions
 * 
 * @param{Array} origQuestions is an Array of Objects that is the questions
 * 			field for a specific Application
 * @param{Array} answers is an Array of Objects with keys that is "id" 
 * 			(mapping to an Object id), and "answer" (mapping to a String)
 *
 * @return an Object with key success mapping to a Boolean that is true if 
 * every question in origQuestions matches every question in answers 
 * (with exception to answers) and that every required question has an answer
 * and a key errMsg mapping to a string error message
 */
var verifyForSubmissions = function(origQuestions, answers) {
	var verificationObj = verifyForUpdate(origQuestions, answers);
	if (verificationObj.success) {
		var verified = true;

		// check that all required fields are filled out
		origQuestions.forEach(function(question, i) {
			var question2 = answers[i];
			if (question.required) {
				if (question2["answer"] == '')
					verified = false;
			}
		});
		if (verified) {
			return {success : true, errMsg : null};
		} else {
			return {success : false, errMsg : "Not all required questions answered."};
		};
	}
	return {success : false, errMsg : verificationObj.errMsg};

};

/**
 * Checks if answers is okay for updating given origQuestions
 *
 * @param{Array} origQuestions is an Array of Objects that is the questions
 * 			field for a specific Application
 * @param{Array} answers is an Array of Objects with keys that is "id" 
 * 			(mapping to an Object id), and "answer" (mapping to a String)
 *
 * @return an Object with key success mapping to a Boolean that is true 
 * if every question in origQuestions matches every question in 
 * answers (with exception to answers), and a key errMsg mapping to a string 
 * error message
 */
var verifyForUpdate = function(origQuestions, answers) {
	if (origQuestions.length !== answers.length) {
		return { success : false, errMsg : "Wrong number of questions and answers." };
	}

	var verified = true;

	// initialize array for checking whether or not answers have been correctly submitted
	var verifyAnswers = [];

	// check that all question, required, type, options are the same for question and question2
	origQuestions.forEach(function(question, i) {
		var question2 = answers[i];
		if (question._id.toString() !== question2._id.toString()) {
			verified = false;
		}
		verifyAnswers.push({
			"question" : question.question,
			"required" : question.required,
			"type" : question.type,
			"options" : question.options,
			"answer" : (question2.answer === '') ? undefined : question2.answer
		});
	});

	// if format matches for origQuestions and answers, check that each question is answered correctly
		if (verified) {
			return verifyAnsweredQuestionsCorrectly(verifyAnswers);
		} else {
			return {success : false, errMsg : "Answers are not for this question."};
		}
};


/**
 * Checks if answers in questions are appropriate: if the type of a question
 * is radio, answer must be "yes" or "no", if the type of a question is
 * dropdown, then the answer must come from the options of that question
 *
 * @param{Array} questions is an Array of Objects with keys question,
 * required, type, options, and answer
 *
 * @return an Object with key success mapping to a Boolean that is true 
 * if each question in questions has an appropriate answer, and false otherwise
 * and a key errMsg mapping to a string error message if any
 */
var verifyAnsweredQuestionsCorrectly = function(questions) {
	var verified = true;
	var errMsg = null;
	questions.forEach(function(question) {
		// check that if type is "radio", answer is "yes" or "no" or empty
		if (question.type === "radio" && question.answer) {
			if (question.answer !== "yes" && question.answer !== "no") {
				verified = false;
			}
		}
		// check that if type is "dropdown", answer is in options or empty
		if (question.type === "dropdown" && question.answer) {
			if (question.options.indexOf(question.answer) < 0) {
				verified = false;
			}
		}
	});
	if (verified) {
		return { success: true, errMsg: null };
	} else {
		return { success: false, errMsg: "An answer in the application is invalid." };
	}
};

var Application = mongoose.model("Application", applicationSchema);
module.exports = Application;