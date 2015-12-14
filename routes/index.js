/**
 * @author: Maddie Dawson
 */
 
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.user) {
		if (req.session.user.studentInfo) {
			if (req.session.user.studentInfo.commonFilled) {
				res.render('s-index', { title : 'Cintern'});
			} else {
				res.render('s-common', { title : 'Cintern'});
			}
		} else {
			if (req.session.user.employerInfo.verified) {
				res.render('e-index', { title : 'Cintern'});
			} else {
				res.render('not-verified', { title : 'Cintern'});
			}
		}
	} else {
		res.render('index', { title : 'Cintern'});
	}

});

module.exports = router;
