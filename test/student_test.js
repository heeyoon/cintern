/**
 * @author Lynda Tang and Heeyoon Kim
 */

var assert = require("assert");
var Student = require('../models/Student');
var User = require('../models/User');
var mongoose = require('mongoose');
var passwordHash = require('password-hash');

/**
 * Functions tested:
 * createStudent
 *   (1) creates a student given that the student does not already have account
 *   (2) does not create an account if account with that email exists
 * findByUserId
 *   (1) student with that user Id exists 
 *   (2) student with that user Id does not exist
 * setCommonFilled
 *   (1) student filled out the common
 */
describe('Student', function() {
  beforeEach(function(done) {
    mongoose.connect('mongodb://localhost/testcintern');
    User.remove({}, function() {
    });
    Student.remove({}, function(){
    	done();
    });
  });

  afterEach(function(done) {
    User.remove({}, function() {
      mongoose.connection.close();
      done();
    });
  });

  describe('#createStudent', function() {
   	it('should create a Student and a User for that Student', function(done){
   		Student.createStudent('jenn', 'jennpw', function(errMsg, res){
			var id = "";
   			Student.find({}, function(err, students){
   				assert.equal(1, students.length);
   				assert.equal(false, students[0].commonFilled);
 			    id = students[0].user;
   			    
 			    User.findOne({email: 'jenn'}, function(err, user){
     				assert.equal(id, user._id.toString());
     				assert.equal('jenn', user.email);
     				assert.equal(true, passwordHash.verify('jennpw', user.password));
     				assert.equal(true, user.isStudent);
     				done();
     			});
   			});
   		});
   	});
   	
   	it('should not create an Student with the same email', function(done){
   		Student.createStudent('hee', 'yoon', function(errMsg, res){
   			Student.find({}, function(err, students){
   				assert.equal(1, students.length);
   				assert.equal(false, students[0].commonFilled);
 			    id = students[0].user;
   			    
 			    User.findOne({email:'hee'}, function(err, user){
     				assert.equal('hee', user.email);
     				assert.equal(true, passwordHash.verify('yoon', user.password));
     				assert.equal(true, user.isStudent);
     				
     				Student.createStudent('hee', 'yoon', function(errMsg, res){
       				assert(errMsg);
       				done();
       			});
   			  });
   			});
   		});
   	});
  }); 

  describe('#findByUserId', function(){
    it('should find a student if the student exists', function(done){
      Student.createStudent('Heeyoon', 'password', function(errMsg, createdStudent) {
        User.findOne({email: 'Heeyoon'}, function(err, user) {
          Student.findByUserId(user._id, function(errMsg, student) {
            assert(student != undefined);
            done();
          });
        });
      });
    });

    it('should not find a student if the student does not exist', function(done){
      Student.createStudent('Heeyoon', 'password', function(errMsg, createdStudent) {
        var somOtherUserId = "5661262b79899fbf172c8587";
        Student.findByUserId(somOtherUserId, function(errMsg, student) {
          assert(errMsg);
          assert.equal(student, undefined);
          done();
        });
      });
    });
  });
  
  describe('#setCommonFilled', function(){
  	it('should change the status for a student', function(done){
  		Student.createStudent('mdd', 'trains', function(errMsg, student){
  			Student.setCommonFilled(student.user, function(err, res){
  				Student.findOne({user: student.user}, function(err, stud){
  					assert.equal(true, stud.commonFilled);
  					done();
  				});
  			});
  		});
  	});
  });
   
});
