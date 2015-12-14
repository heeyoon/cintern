/**
 * @author: Jennifer Wu
 */
var mainContainer = '#s-main-container';

// load the dash page
$(document).ready(function() {
	loadDashPage();
});

// handling the navigation bar clicking
$(document).on('click', '#dash-nav', function(evt) {
	loadDashPage();
});

$(document).on('click', '#listing-nav', function(evt) {
	loadAllListingsPage();
});

$(document).on('click', '#common-nav', function(evt) {
	loadCommonPage();
})

// change the active status of the navigarion tabs when a new one is clicked on
$(document).on('click', 'ul.nav-tabs li', function(e){
  $('ul.nav-tabs li.active').removeClass('active');
    $(this).addClass('active');
});

// on clicking a listing, load the listing information
$(document).on('click', '.s-listing', function(evt) {
	var listingId = $(this).data('listing-id');
	var company = $(this).data('listing-company');
	loadListingModal(listingId, company);
});

// on clicking a custom, load the custom information
$(document).on('click', '.student-custom', function(evt) {
	var item = $(this);
	var listingId = item.data('listing-id');
	loadCustomModal(listingId);
});

// send server request to add a custom to the student's list
$(document).on('submit', '#add-custom-form', function(evt) {
    evt.preventDefault();
    var formData = helpers.getFormData(this);
    var listingId = $(this).data('listing-id');

    var extractedData = extractCsurfToken(formData);
    var csrfToken = extractedData[0];

    $.ajax({
		type: 'POST', 
		url: '/students/customs/' + listingId,
		headers: { 'csrf-token' : csrfToken }
	}).done(function(response) {
		$('#listingModal').modal('hide');
	}).fail(function(response) {
		$('#s-listing-error').text(getErrMsg(response));
	});
});

// withdrow a submitted custom
$(document).on('click', '#withdraw-custom-btn', function(evt) {
	var customId = $(this).data('custom-id');

	var formData = helpers.getFormData('#submit-custom-form');
    var extractedData = extractCsurfToken(formData);
    var csrfToken = extractedData[0];

	$.ajax({
		type: 'PUT', 
		url: '/students/customs/withdrawal/' + customId,
		headers: { 'csrf-token' : csrfToken }
	}).done(function(response) {
		$('#customModal').modal('hide');
	}).fail(function(response) {
		$('#s-custom-error').text(getErrMsg(response));
	});
});

// delete a custom
$(document).on('click', '#delete-custom-btn', function(evt) {
	var customId = $(this).data('custom-id');

	var formData = helpers.getFormData('#submit-custom-form');
    var extractedData = extractCsurfToken(formData);
    var csrfToken = extractedData[0];

	$.ajax({
		type: 'DELETE', 
		url: '/students/customs/' + customId,
		headers: { 'csrf-token' : csrfToken }
	}).done(function(response) {
		$('#customModal').modal('hide');
	}).fail(function(response) {
		$('#s-custom-error').text(getErrMsg(response));
	});
});

// submit a custom
$(document).on('submit', '#submit-custom-form', function(evt) {

    evt.preventDefault();
    var formData = helpers.getFormData(this);
    var customId = $(this).data('custom-id');

    var extractedData = extractCsurfToken(formData);
    var csrfToken = extractedData[0];
    var answers = extractedData[1];

    $.ajax({
        type: 'PUT', 
        url: '/students/customs/submitted/' + customId,
        contentType: 'application/json',
        data: JSON.stringify({ "answers" : answers }),
        headers: { 'csrf-token' : csrfToken }
    }).done(function(response) {
    	$('#customModal').modal('hide');
    }).fail(function(response) {
        $('#s-custom-error').text(getErrMsg(response));
    });
});

// update a custom with the current answers
$(document).on('click', '#save-custom-btn', function(evt) {
    evt.preventDefault();
    var formData = helpers.getFormData('#submit-custom-form');
    var customId = $('#submit-custom-form').data('custom-id');
    var listingId = $('#submit-custom-form').data('listing-id');

    var extractedData = extractCsurfToken(formData);
    var csrfToken = extractedData[0];
    var answers = extractedData[1];

    $.ajax({
        type: 'PUT', 
        url: '/students/customs/saved/' + customId,
        contentType: 'application/json',
        data: JSON.stringify({ "answers" : answers}),
        headers: { 'csrf-token' : csrfToken }
    }).done(function(response) {
        loadCustomModal(listingId);
    }).fail(function(response) {
        $('#s-custom-error').text(getErrMsg(response));
    });
});

// Loads the dash page
var loadDashPage = function(sortList) {
	$.ajax({
		type: "GET",
		url: "/students/customs"
	}).done(function(response) {
		loadContainer(mainContainer, 's_dash_page', { apps: response.content.applications });
		$("#s-dash-table").tablesorter({
			sortList: sortList
		});
	}).fail(function(response) {
		loadError(mainContainer, response);
	})
};

// Loads all listings
var loadAllListingsPage = function(sortList) {
	$.ajax({
		type: "GET",
		url: "/students/listings"
	}).done(function(response) {
		loadContainer(mainContainer, 's_listings', {
			listings: response.content.listings, 
			userListings: response.content.userListings
		});
		$("#s-listing-table").tablesorter({
			sortList : sortList
		});
	}).fail(function(response) {
		loadError(mainContainer, response);
	})
}

// Loads the common app that the user has already submitted
var loadCommonPage = function() {
	$.ajax({
		type: "GET",
		url: "/students/common"
	}).done(function(response) {
      	loadContainer(mainContainer, 's_common', {
			questions : response.content.application.questions, 
            isInProgress : false
		});
		loadDropdowns();
	}).fail(function(response) {
		loadError(mainContainer, response);
	})
}

// Loads an individual listing page corresponding to the listingId
var loadListingModal = function(listingId, company) {
	$.ajax({
		type: "GET",
		url: "/students/listings/" + listingId,
	}).done(function(response) {
		var data = response.content.listing;
		data.company = company;
		data.csrfToken = response.token;
		data.application = response.content.application;
		
		loadContainer('#listing-modal-content', 's_listing', data);
		$("#listing-modal-header").text(data.company + ': ' + data.title);
		$('#listingModal').modal('show');
	}).fail(function(response) {
		$('#s-listings-error').text(getErrMsg(response));
	});
}

// Loads the Custom App page corresponding to the userId and listingId
var loadCustomModal = function(listingId) {
	$.ajax({
		type: "GET",
		url: "/students/customs/" + listingId
	}).done(function(response) {
    	loadContainer('#custom-modal-content', 's_custom', {
	      listing : listingId, 
	      questions : response.content.application.questions, 
	      customId : response.content._id, 
	      state : response.content.state,
	      isInProgress : response.content.state === "save",
	      csrfToken: response.token
	    });
    	loadDropdowns();
    	$("#custom-modal-header").text(response.content.listing.title);
        $('#customModal').modal('show'); 

	}).fail(function(response) {
		$('#s-dash-error').text(getErrMsg(response));
	});
}

// reload page when applicant modal is closed
$(document).on('hidden.bs.modal', '#customModal', function(evt) {
    var sortList = SaveSortOrder('s-dash-table');
    loadDashPage(sortList);
});

// reload page when applicant modal is closed
$(document).on('hidden.bs.modal', '#listingModal', function(evt) {
    var sortList = SaveSortOrder('s-listing-table');
    loadAllListingsPage(sortList);
});