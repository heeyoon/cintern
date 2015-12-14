/**
 * @author Lynda Tang and Heeyoon Kim
 */

var assert = require("assert");
var Employer = require('../models/Employer');
var User = require('../models/User');
var mongoose = require('mongoose');
var passwordHash = require('password-hash');

/**
 * Functions tested:
 * createEmployer
 *   (1) creates an employer 
 *   (2) does not create an account if account with that email exists
 *   (3) does not create an account if an employer with the same company name exists
 * findByUserId
 *   (1) employer with that user Id exists 
 *   (2) employer with that user Id does not exist
 * verifyEmployer
 *   (1) should change status of employer to verified
 */
describe('Employer', function() {
  beforeEach(function(done) {
    mongoose.connect('mongodb://localhost/testcintern');
    User.remove({}, function() {
    });
    Employer.remove({}, function(){
    	done();
    });
  });

  afterEach(function(done) {
    User.remove({}, function() {
      mongoose.connection.close();
    });
    Employer.remove({}, function(){
    	mongoose.connection.close();
    	done();
    });
  });

  describe('#createEmployer', function() {
   	it('should create an Employer and a User for that Employer', function(done){
   		Employer.createEmployer('goog', 'googpw', 'Google', function(errMsg, res){
			var id = "";
   			Employer.find({company: 'Google'}, function(err, emps){
   				assert.equal(1, emps.length);
   			  id = emps[0].user;
   			  //Checks to make sure that this employer is not verified yet
   			  assert.equal(false, emps[0].verified);
   			    
 			    User.findOne({email: 'goog'}, function(err, user){
     				assert.equal(id, user._id.toString());
     				assert.equal('goog', user.email);
     				assert.equal(true, passwordHash.verify('googpw', user.password));
     				assert.equal(false, user.isStudent);
     				done();
     			});
   			});
   		});
   	});
   	
   	it('should not create an employer with the same email', function(done){
   		Employer.createEmployer('goog', 'googpw', 'Google', function(errMsg, res){
   			User.findOne({email: 'goog'}, function(err, user){
   				assert.equal('goog', user.email);
   				assert.equal(true, passwordHash.verify('googpw', user.password));
   				assert.equal(false, user.isStudent);
   				
   				Employer.createEmployer('goog', 'goog1pw', 'Goog', function(errMsg, res){
     				assert(errMsg);
     				done();
     			});
   			});
   		});
   	});
   	
   	it('should not create an employer with the same company', function(done){
   		Employer.createEmployer('goog', 'googpw', 'Google', function(errMsg, res){
   			User.findOne({email: 'goog'}, function(err, user){
   				assert.equal('goog', user.email);
   				assert.equal(true, passwordHash.verify('googpw', user.password));
   				assert.equal(false, user.isStudent);
   				
   				Employer.createEmployer('goog1', 'goog1pw', 'Google', function(errMsg, res){
     				assert(errMsg);
     				done();
     			});
   			});
   		});
   	});	
  });  

  describe('#findByUserId', function(){
    it('should find an employer if the employer exists', function(done){
      Employer.createEmployer('Rito', 'plz', 'Rito', function(errMsg, createdEmployer) {
        User.findOne({email: 'Rito'}, function(err, user) {
          Employer.findByUserId(user._id, function(errMsg, employer) {
            assert(employer != undefined);
            assert(employer.company, 'Rito');
            done();
          });
        });
      });
    });

    it('should not find an employer if the employer does not exist', function(done){
      Employer.createEmployer('Rito', 'plz', 'Rito', function(errMsg, createdEmployer) {
        var somOtherUserId = "5661262b79899fbf172c8587";
        Employer.findByUserId(somOtherUserId, function(errMsg, employer) {
          assert(errMsg);
          assert.equal(employer, undefined);
          done();
        });
      });
    });
  });
  
  describe('#verifyEmployer', function(){
  	it('should change the verified for an employer ', function(done){
  		Employer.createEmployer('Rito', 'plz', 'Rito', function(errMsg, employer){
  			Employer.verifyEmployer(employer.user, function(err, res){
  				Employer.findOne({user: employer.user}, function(err, emp){
  					assert.equal(true, emp.verified);
  					done();
  				});
  			});
  		});
  	});
  });
});
