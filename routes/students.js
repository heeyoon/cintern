/**
 * @author: Maddie Dawson
 */
 
var express = require('express');
var listing = require('../controllers/listing');
var common = require('../controllers/common');
var custom = require('../controllers/custom');
var utils = require('../utils/utils');
var router = express.Router();

/**
 * Require that a user is logged in and that the current user 
 * is a student, not an employer
 */
var requireStudent = function(req, res, next) {
	if (!req.session.user || !req.session.user.studentInfo) {
		utils.sendErrResponse(res, 403, 'Must be logged in and a student to use this feature.');
	} else {
		next();
	}
};

router.all('*', requireStudent);

// Add a given employer ID to the request body
router.param('employerid', function(req, res, next, employerId) {
	req.body.employerId = employerId;
	next();
});

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

// Add a given state to the request body
router.param('state', function(req, res, next, state) {
	req.body.state = state;
	next(); 
});

/* GET all listings */
router.get('/listings',listing.getAllCurrentListings);

/* GET listing */
router.get('/listings/:lstgid', listing.getListing);

/* GET common application */
router.get('/common', common.getCommon);

/* PUT submit common application */
router.put('/common', common.submitCommon);

/* GET all applications */
router.get('/customs', custom.getAllStudentCustoms);

/* GET custom application */
router.get('/customs/:lstgid', custom.getCustom);

/* POST add custom application */
router.post('/customs/:lstgid', custom.addCustom);

/* PUT update custom application */
router.put('/customs/:state/:customid', function(req, res, next) {
	var state = req.body.state;
	if (state === 'submitted') {
		custom.submitCustom(req, res, next);
	} else if (state === 'saved') {
		custom.saveCustom(req, res, next);
	} else if (state === 'withdrawal') {
		custom.withdrawCustom(req, res, next);
	} else {
		res.sendErrResponse(res, 403, "Invalid state update");
	}
});

/* DELETE delete a custom application */
router.delete('/customs/:customid', custom.deleteCustom);

module.exports = router;
