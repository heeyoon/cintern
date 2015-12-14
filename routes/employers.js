/**
 * @author: Maddie Dawson
 */
 
var express = require('express');
var listing = require('../controllers/listing');
var custom = require('../controllers/custom');
var utils = require('../utils/utils');
var router = express.Router();

/**
 * Require that a user is logged in and that the current user 
 * is an employer, not a student. Also requires that the employer is a verified employer
 */
var requireEmployer = function(req, res, next) {
	if (!req.session.user || req.session.user.studentInfo) {
		utils.sendErrResponse(res, 403, 'Must be logged in and an employer to use this feature.');
	} else if (!req.session.user.employerInfo.verified) {
		utils.sendErrResponse(res, 403, 'Must be a verified employer to use this feature');
	} else {
		next();
	}
};

router.all('*', requireEmployer);


// Add a given listing ID to the request body
router.param('lstgid', function(req, res, next, listingId) {
	req.body.listingId = listingId;
	next(); 
});

// Add a given application ID to the request body
router.param('customid', function(req, res, next, customId) {
	req.body.customId = customId;
	next(); 
});

// Add a given user ID to the request body
router.param('userid', function(req, res, next, userId) {
	req.body.userId = userId;
	next(); 
});

// Add a given state to the request body
router.param('state', function(req, res, next, state) {
	req.body.state = state;
	next(); 
});

/* GET listings */
router.get('/listings', listing.getEmployerListings);

/* POST create listing */
router.post('/listings', listing.createListing);

/* DELETE listing */
router.delete('/listings/:lstgid', listing.deleteListing);

/* GET the application (both the common and custom) for the listing that the user has filled out*/  
router.get('/customs/:lstgid/:userid', custom.getFullApplication);

/* GET listing applicants */
router.get('/customs/:lstgid', custom.getApplicants);

/* PUT update a custom application */
router.put('/customs/:state/:customid', function(req, res, next) {
	var state = req.body.state;
	if (state === 'starred') {
		custom.starCustom(req, res, next);
	} else if (state === 'unstarred') {
		custom.unstarCustom(req, res, next);
	} else if (state === 'rejected') {
		custom.rejectCustom(req, res, next);
	} else {
		res.sendErrResponse(res, 403, "Invalid state update");
	}
});

module.exports = router;
