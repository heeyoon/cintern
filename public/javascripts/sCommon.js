/**
 * @author Jennifer Wu
 */

var mainContainer = '#common-main-container';

$(document).ready(function() {
	loadHomePage();
});

// submit the common application
$(document).on('submit', '#submit-common-form', function(evt) {
    evt.preventDefault();
    var formData = helpers.getFormData(this);
    
    var extractedData = extractCsurfToken(formData);
    var csrfToken = extractedData[0];
    var answers = extractedData[1];

    $.ajax({
        type: 'PUT', 
        url: '/students/common',
        contentType: 'application/json',
        data: JSON.stringify({ "answers" : answers }),
        headers: { 'csrf-token' : csrfToken }
    }).done(function(response) {
        location.reload();
    }).fail(function(response) {
        $('#s-common-error').text(getErrMsg(response));
    });
});

// loads the home page that is the common application
var loadHomePage = function() {
	$.ajax({
        type: "GET",
        url: "/students/common",
    }).done(function(response) {
      	loadContainer(mainContainer, 's_common', {
			questions : response.content.application.questions, 
            isInProgress : true,
            csrfToken: response.token
		});
        loadDropdowns();
	}).fail(function(response) {
        loadError(mainContainer, response);
    });
};
