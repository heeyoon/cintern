/**
 * @author: Lynda Tang
 */

var express = require('express');
var user = require('../controllers/user');
var router = express.Router();
var student = require('../controllers/student');
var employer = require('../controllers/employer');
var utils = require('../utils/utils');

var ExpressBrute = require('express-brute'),
    MongoStore = require('express-brute-mongo'),
    MongoClient = require('mongodb').MongoClient,
    moment = require('moment'),
    store;
    
//////////////////////////////////////////////////////////////////////////
// ExpressBrute code referenced from: https://www.npmjs.com/package/express-brute
//////////////////////////////////////////////////////////////////////////

var store = new ExpressBrute.MemoryStore();

var failCallback = function (req, res, next, nextValidRequestDate) {
	//Not using utils but p much the same thing
	//Throws errors if using utils/functions
	res.status(429).json({
		success: false,
		err: "You've made too many failed attempts in a short period of time, please try again "+moment(nextValidRequestDate).fromNow()
	}).end();
};

// Start slowing requests after 5 failed attempts to do something for the same user 
var userBruteforce = new ExpressBrute(store, {
    freeRetries: 4,
    proxyDepth: 1,
    minWait: 1*60*1000, // 1 minute, 
    maxWait: 60*60*1000, // 1 hour, 
    failCallback: failCallback
});

// Add a given listing ID to the request body
router.param('lstgid', function(req, res, next, listingId) {
	req.body.listingId = listingId;
	next(); 
});

// Add a given user ID to the request body
router.param('userid', function(req, res, next, userId) {
	req.body.userId = userId;
	next(); 
});

/* POST login */
router.post('/login', userBruteforce.prevent, user.login);

/* POST logout */
router.post('/logout', user.logout);

/* POST new student */
router.post('/students', student.createStudent);

/* POST new employer */
router.post('/employers', employer.createEmployer);

/* GET verify */
router.get('/verify', function(req, res, next){
	var token = req.body.token || req.query.token || req.headers['token'];
	console.log(token);
	res.render('verify', {emptoken: token});
});

/* POST verify employer */
router.post('/verify', employer.verifyEmployer);

module.exports = router;
