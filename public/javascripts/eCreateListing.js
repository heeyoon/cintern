/**
 * @author Lynda Tang and Jennifer Wu
 */
var questionNum = 0;

// adds a text question to the question list
$(document).on('click', '#add-text-question', function(evt) {
	evt.preventDefault();
	var question = createNewQuestion(questionNum, true);
	questionNum += 1;
	$('#question-list').append(question);
});

// adds a radio question to the question list
$(document).on('click', '#add-radio-question', function(evt) {
	evt.preventDefault();
	var question = createNewQuestion(questionNum, false);
	questionNum += 1;
	$('#question-list').append(question);
});

// deletes a question
$(document).on('click', '.delete-question', function(evt) {
	evt.preventDefault();
	var question = $(this).data('question');
	$('#' + question).remove();
})

// sends request to server to create a new listing
$(document).on('submit', '#create-listing', function(evt) {
	evt.preventDefault();
	var data = helpers.getFormData(this);

	var extractedData = extractCsurfToken(data);
    var csrfToken = extractedData[0];
    data = extractedData[1];
	
	// format questions for post request
	var questionList = [];
	Object.keys(data).forEach(function(id) {
		if (id.indexOf("newq") === 0){
			questionList.push({
	        	"question" : data[id],
	        	"type" : $('#' + id).data('type'),
	        	"required" : data['optional-' + id] !== "yes"
	        });
        }
	});
	
	var content = {
		title : data.title,
		description : data.description,
		requirements : data.requirements,
		questions : questionList,
		deadline : data.deadline
	};

   $.ajax({
   		type:'POST',
   		url: '/employers/listings',
   		contentType: 'application/json',
   		data: JSON.stringify(content),
   		headers: { 'csrf-token' : csrfToken }
   	}).done(function(response) {
        $('#new-listing-modal').modal('hide');
 	}).fail(function(response) {
      	$('#e-create-listing-error').text(getErrMsg(response));
  	});
});

// reload dash page when modal is closed
$(document).on('hidden.bs.modal', '#new-listing-modal', function(evt) {
  	var sortList = SaveSortOrder('e-dash-table');
    loadDashPage(sortList);
});

/**
 * Creates the HTML div for the appropriate type of question
 *
 * @param{Integer} qNum
 * @param{isTextQuestion} true if a text question, false if a radio question
 * @return HTML div element for the appropriate type of question
 */
var createNewQuestion = function(qNum, isTextQuestion) {
	var question = document.createElement("div");
	var newId = "newq" + qNum;
	var optId = "optional-newq" + qNum;
	question.setAttribute("id", newId);
	if (isTextQuestion) {
		question.setAttribute("data-type", "text");
		$("<span>Text Question </span>").appendTo(question);
	} else {
		question.setAttribute("data-type", "radio");
		$("<span>Yes or No Question </span>").appendTo(question);
	} 

	// add required tag
	$("<span class='required'>*</span>").appendTo(question);

	// space for question
	$('<textarea/>').attr({"class": "form-control", "cols": '50', "name": newId, "required" : true}).appendTo(question);
	
	// creating checkbox if question is optional
	$('<input/>').attr({"type": 'hidden', "name": optId, "value": 'no'}).appendTo(question);

	// optional feature for text questions
	if (isTextQuestion) {
		$('<input/>').attr({"type": 'checkbox', "name": optId, "value":'yes'}).appendTo(question);
		$("<span> Optional</span>").appendTo(question);
	} else {
		$("<span><em>Yes or No questions cannnot be optional</em></span>").appendTo(question);
	}
	
	// delete button for user to remove question
	var deleteBtn = $('<button/>').attr({"class":"pull-right btn btn-danger btn-xs delete-question", "data-question": newId});
	$("<span class='glyphicon glyphicon-trash'></span>").appendTo(deleteBtn);
	deleteBtn.append(" Delete Question");
	deleteBtn.appendTo(question);
	
	$('<br>').appendTo(question);
	$('<br>').appendTo(question);

	return question;
};