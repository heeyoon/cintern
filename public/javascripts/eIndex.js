/** 
 * @author Jennifer Wu
 */
var mainContainer = '#e-main-container';

$(document).ready(function() {
	loadDashPage();
});

// when a listing row is clicked, show applicants of listing page
$(document).on('click', '.listing-row', function(evt) {
	var item = $(this);
    var listingId = item.data('listing-id');
    loadApplicantsPage(listingId);
});

// delete the listing
$(document).on('submit', '#delete-listing-form', function(evt) {
    evt.preventDefault();
    var data = helpers.getFormData(this);

    var extractedData = extractCsurfToken(data);
    var csrfToken = extractedData[0];

    var listingId = $(this).data('listing-id');

    $.ajax({
        type: 'DELETE',
        url: '/employers/listings/' + listingId,
        contentType: 'application/json',
        headers: { 'csrf-token' : csrfToken }
    }).done(function(response) {
        loadDashPage();
    }).fail(function(response) {
        $('#e-applicants-error').text(getErrMsg(response));
    });
});

// when an applicant cell is clicked, load the application modal
$(document).on('click', '.applicant-cell', function(evt) {
	var item = $(this).parent();
    var userId = item.data('applicant-id');
    var listingId = item.data('listing-id');
    getFullAppModal(userId, listingId);
});

// when an applicant cell is starred, star the application
$(document).on('click', '.star-applicant-cell', function(evt) {
    var item = $(this).parent();
    var listingId = item.data('listing-id');
    var customId = item.data('custom-id');

    var formData = helpers.getFormData('#star-app-form');
    var extractedData = extractCsurfToken(formData);
    var csrfToken = extractedData[0];

    $.ajax({
        type: 'PUT', 
        url: '/employers/customs/starred/' + customId,
        data : { "listingId" : listingId },
        headers: { 'csrf-token' : csrfToken }
    }).done(function(response) {
        reloadApplicantsPage();
    }).fail(function(response) {
        $('#e-applicants-error').text(getErrMsg(response));
    });
});

// when an applicant cell is unstarred, unstar the application
$(document).on('click', '.unstar-applicant-cell', function(evt) {
    var item = $(this).parent();
    var listingId = item.data('listing-id');
    var customId = item.data('custom-id');

    var formData = helpers.getFormData('#star-app-form');
    var extractedData = extractCsurfToken(formData);
    var csrfToken = extractedData[0];

    $.ajax({
        type: 'PUT', 
        url: '/employers/customs/unstarred/' + customId,
        data : { "listingId" : listingId },
        headers: { 'csrf-token' : csrfToken }
    }).done(function(response) {
        reloadApplicantsPage();
    }).fail(function(response) {
        $('#e-applicants-error').text(getErrMsg(response));
    });
});

// star an application
$(document).on('click', '.star-custom-btn', function(evt) {
    evt.preventDefault();

    var formData = helpers.getFormData('#change-status-form');
    var extractedData = extractCsurfToken(formData);
    var csrfToken = extractedData[0];

    var customId = $(this).data('custom-id');
    var listingId = $(this).data('listing-id');
    var userId = $(this).data('user-id');

    $.ajax({
        type: 'PUT', 
        url: '/employers/customs/starred/' + customId,
        data : { "listingId" : listingId },
        headers: { 'csrf-token' : csrfToken }
    }).done(function(response) {
        getFullAppModal(userId, listingId);
    }).fail(function(response) {
        $('#e-full-app-error').text(getErrMsg(response));
    });
});

// untsar an application
$(document).on('click', '.unstar-custom-btn', function(evt) {
    evt.preventDefault();

    var formData = helpers.getFormData('#change-status-form');
    var extractedData = extractCsurfToken(formData);
    var csrfToken = extractedData[0];

    var customId = $(this).data('custom-id');
    var listingId = $(this).data('listing-id');
    var userId = $(this).data('user-id');
    
    $.ajax({
        type: 'PUT', 
        url: '/employers/customs/unstarred/' + customId,
        data : { "listingId" : listingId },
        headers: { 'csrf-token' : csrfToken }
    }).done(function(response) {
        getFullAppModal(userId, listingId);
    }).fail(function(response) {
        $('#e-full-app-error').text(getErrMsg(response));
    });
});

// reject an application
$(document).on('click', '#reject-custom-btn', function(evt) {
    evt.preventDefault();

    var formData = helpers.getFormData('#change-status-form');
    var extractedData = extractCsurfToken(formData);
    var csrfToken = extractedData[0];

    var customId = $(this).data('custom-id');
    var listingId = $(this).data('listing-id');
    var userId = $(this).data('user-id');
    
    $.ajax({
        type: 'PUT', 
        url: '/employers/customs/rejected/' + customId,
        data : { "listingId" : listingId },
        headers: { 'csrf-token' : csrfToken }
    }).done(function(response) {
        $('#applicantModal').modal('hide');
    }).fail(function(response) {
        $('#e-full-app-error').text(getErrMsg(response));
    });
});

// Loads the Employer Dash
var loadDashPage = function(sortList) {
    $.ajax({
        type: "GET",
        url: '/employers/listings'
    }).done(function(response) {
        // load the employer dash
        loadContainer(mainContainer, 'e_dash_page', { 
            listings: response.content.listings, 
            numApplicantsMap: response.content.numApplicantsMap 
        });
        // loading the modal
        loadContainer('#new-listing-modal-content', 'e_create_listing', { 
            csrfToken: response.token 
        });

        // bind datetimepicker
        var date = new Date();
        var currentMonth = date.getUTCMonth();
        var currentDate = date.getUTCDate();
        var currentYear = date.getUTCFullYear();
        $('#datetimepicker1').datetimepicker({
            format: 'MM/DD/YYYY',
            minDate: new Date(currentYear, currentMonth, currentDate)
        });

        // sort table on page according to sortList
        $("#e-dash-table").tablesorter({
            sortList : sortList
        });
    }).fail(function(response) {
        loadError(mainContainer, response);
    });
};

// Loads the applicant page corresponding to the listingId
var loadApplicantsPage = function(listingId, sortList) {
    $.ajax({
        type: "GET",
        url: '/employers/customs/' + listingId
    }).done(function(response) {
        // load applicants page
        loadContainer(mainContainer, 'e_applicants', {
            applicants: response.content.applicants,
            headers: response.content.headers, listingId: listingId,
            csrfToken: response.token
        });

        // sort tablee according to sortList
        $("#e-applicants-table").tablesorter({
            sortList: sortList,
            headers: {
                0 : { sorter : 'isStar' }
            }
        });
    }).fail(function(response) {
        loadError(mainContainer, response);
    });
};

// Loads the Full Application page corresponding to the userId and listingId
var getFullAppModal = function(userId, listingId) {
    $.ajax({
        type: "GET",
        url: '/employers/customs/' + listingId+ '/' + userId
    }).done(function(response) {
        // load the modal
        loadContainer('#applicant-modal-content', 'e_full_app', {
            common : response.content.commonApp,
            custom : response.content.customApp,
            customId : response.content.customId,
            listing : response.content.listing,
            owner : response.content.owner,
            isStar : response.content.state === "star",
            isSubmitted : true, 
            csrfToken: response.token
        });  
        
        loadDropdowns();
        $('#applicant-modal-header').text(response.content.owner.email);
        $('#applicantModal').modal('show'); 
    }).fail(function(response) {
        $('#e-applicants-error').text(getErrMsg(response));
    });
};

// reload the applicants page keeping the sorting order of the page
var reloadApplicantsPage = function() {
    var sortList = SaveSortOrder('e-applicants-table');
    loadApplicantsPage($('#applicantModal').data('listing-id'), sortList);
}

// reload page when applicant modal is closed
$(document).on('hidden.bs.modal', '#applicantModal', function(evt) {
    reloadApplicantsPage();
});
