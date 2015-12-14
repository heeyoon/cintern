/**
 * @author Jennifer Wu
 *
 * Test file for the common model
 */

var assert = require("assert");
var Common = require('../models/common');
var User = require('../models/User');
var Application = require('../models/application');
var mongoose = require('mongoose');

describe('Common', function() {
  beforeEach(function(done) {
    mongoose.connect('mongodb://localhost/testcintern');
    Common.remove({}, function() {
      User.remove({}, function() {
        Application.remove({}, function() {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    Common.remove({}, function() {
      User.remove({}, function() {
        Application.remove({}, function() {
          mongoose.connection.close();
          done();      
        });
      });
    });
  });

  /** 
   * input: 
   *    only owner (get)
   *    owner and some custom information (get)
   *    only custom info, no owner (don't get)
   */
  describe('#getCommonInfoForApplicantDisplay', function() {
    it('should retrieve applicant info, only owner', function(done) {
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        Common.createCommon(user._id, function(e, common) {
          var answers = [];
          var answer_map = {};
          Application.formatForShow(common.application, function(e, formattedQuestions) {
            formattedQuestions.forEach(function(question) {
              if (question.options.length === 0) {
                if (question.type === "radio") {
                  answers.push({ "_id" : question._id, "answer" : "yes" });
                  answer_map[question.question] = "yes";
                }
                else {
                  answers.push({ "_id" : question._id, "answer" : "abc" });
                  answer_map[question.question] = "abc";
                } 
              }
              else {
                answers.push({ "_id" : question._id, "answer" : question.options[0]});
                answer_map[question.question] = question.options[0];
              }
            });
            Common.submitCommon(user._id, answers, function(e, commonSubmitted) {
              assert.equal(true, commonSubmitted);
              var headers = Common.getHeadersForApplicantList();
              var userInfo = {};
              userInfo[user._id] = {};
              Common.getCommonInfoForApplicantDisplay(userInfo, function(e, info) {
                var results = info[0];
                assert(Object.keys(results).length >= headers.length);
                Object.keys(results).forEach(function(key, i) {
                  assert(headers.indexOf(key) > -1 || key === "owner");
                  if (key !== 'owner') assert.equal(answer_map[key], results[key]);
                  else assert.equal(user._id.toString(), results[key].toString());
                });
                done();
              });
            });
          });
        });
      });
    });

    it('should retrieve applicant info, owner and some custom', function(done) {
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        Common.createCommon(user._id, function(e, common) {
          var answers = [];
          var answer_map = {};
          Application.formatForShow(common.application, function(e, formattedQuestions) {
            formattedQuestions.forEach(function(question) {
              if (question.options.length === 0) {
                if (question.type === "radio") {
                  answers.push({ "_id" : question._id, "answer" : "yes" });
                  answer_map[question.question] = "yes";
                }
                else {
                  answers.push({ "_id" : question._id, "answer" : "abc" });
                  answer_map[question.question] = "abc";
                } 
              }
              else {
                answers.push({ "_id" : question._id, "answer" : question.options[0]});
                answer_map[question.question] = question.options[0];
              }
            });
            Common.submitCommon(user._id, answers, function(e, commonSubmitted) {
              assert.equal(true, commonSubmitted);
              var headers = Common.getHeadersForApplicantList();
              var userInfo = {};
              userInfo[user._id] = { "dog" : "dogg" };
              Common.getCommonInfoForApplicantDisplay(userInfo, function(e, info) {
                var results = info[0];
                assert(Object.keys(results).length >= headers.length);
                Object.keys(results).forEach(function(key, i) {
                  assert(headers.indexOf(key) > -1 || key === "owner" || key === "dog");
                  if (key !== 'owner' && key !== "dog") assert.equal(answer_map[key], results[key]);
                  else {
                    if (key === "owner") assert.equal(user._id.toString(), results[key].toString());
                    else if (key === "dog") {
                      assert.equal("dogg", results[key]);
                    }
                  }
                });
                done();
              });
            });
          });
        });
      });
    });

    it('should retrieve applicant info, no owner and some custom', function(done) {
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        Common.createCommon(user._id, function(e, common) {
          var answers = [];
          var answer_map = {};
          Application.formatForShow(common.application, function(e, formattedQuestions) {
            formattedQuestions.forEach(function(question) {
              if (question.options.length === 0) {
                if (question.type === "radio") {
                  answers.push({ "_id" : question._id, "answer" : "yes" });
                  answer_map[question.question] = "yes";
                }
                else {
                  answers.push({ "_id" : question._id, "answer" : "abc" });
                  answer_map[question.question] = "abc";
                } 
              }
              else {
                answers.push({ "_id" : question._id, "answer" : question.options[0]});
                answer_map[question.question] = question.options[0];
              }
            });
            Common.submitCommon(user._id, answers, function(e, commonSubmitted) {
              assert.equal(true, commonSubmitted);
              var headers = Common.getHeadersForApplicantList();
              var userInfo = {};
              userInfo["dog"] = { "dog" : "dogg" };
              Common.getCommonInfoForApplicantDisplay(userInfo, function(e, info) {
                assert.notEqual(null, e);
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('#createCommon', function() {
    it('should create a common', function(done) {
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        Common.createCommon(user._id, function(e, common) {
          assert.equal(user._id, common.owner);
          done();
        });
      });
    });
  });

  /**
   * Input: answers
   *    answers is not filled out : should not submit
   *    answers is completely filled out : should submit
   */
  describe('#submitCommon', function() {
    it('should not submit common', function(done) {
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        Common.createCommon(user._id, function(e, common) {
          var answers = [];
          Application.formatForShow(common.application, function(e, formattedQuestions) {
            formattedQuestions.forEach(function(question) {
              answers.push({ "_id" : question._id, "answer" : "" });
            });
            Common.submitCommon(user._id, answers, function(e, commonSubmitted) {
              assert.equal(false, commonSubmitted);
              Application.formatForShow(common.application, function(e, formattedQuestions) {
                formattedQuestions.forEach(function(question) {
                  assert.equal('',question.answer);
                });
                done();
              });
            });
          });
        });
      });
    });

    it('should submit common', function(done) {
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        Common.createCommon(user._id, function(e, common) {
          var answers = [];
          Application.formatForShow(common.application, function(e, formattedQuestions) {
            formattedQuestions.forEach(function(question) {
              if (question.options.length === 0) {
                if (question.type === "radio") answers.push({ "_id" : question._id, "answer" : "yes" });
                else answers.push({ "_id" : question._id, "answer" : "abc" });
              }
              else answers.push({ "_id" : question._id, "answer" : question.options[0]});
            });
            Common.submitCommon(user._id, answers, function(e, commonSubmitted) {
              assert.equal(true, commonSubmitted);
              Application.formatForShow(common.application, function(e, formattedQuestions) {
                formattedQuestions.forEach(function(question) {
                  if (question.options.length === 0){
                    if (question.type === "radio") assert.equal('yes', question.answer);
                    else assert.equal('abc', question.answer);
                  }
                  else assert(question.options.indexOf(question.answer) > -1);
                });
                done();
              });
            });
          });
        });
      });
    });
  });

  /**
   * Input: ownerId
   *    ownerId is valid : should get
   *    ownerId is invalid : should not get
   *    multiple owners : should get right common
   */
  describe('#getCommonByOwnerId', function() {
    it('should get, valid ownerId', function(done) {
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        Common.createCommon(user._id, function(e, common) {
          Common.getCommonByOwnerId(user._id, function(e, c) {
            assert.equal(null, e);
            assert.equal(user._id.toString(), c.owner.toString());
            done();
          });
        });
      });
    });

    it('should not get, invalid ownerId', function(done) {
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        Common.createCommon(user._id, function(e, common) {
          assert.notEqual("1", user._id.toString());
          Common.getCommonByOwnerId("1", function(e, c) {
            assert.notEqual(null, e);
            done();
          });
        });
      });
    });

    it('should get, multiple ownerId', function(done) {
      User.addUser("jennwu@mit.edu", "asdf123gh", true, function(e, user) {
        Common.createCommon(user._id, function(e, common) {
          User.addUser("jennwu2@mit.edu", "asdf1232gh", true, function(e, user2) {
            Common.createCommon(user2._id, function(e, common2) {
              Common.getCommonByOwnerId(user._id, function(e, c) {
                assert.equal(null, e);
                assert.equal(user._id.toString(), c.owner.toString());
                Common.getCommonByOwnerId(user2._id, function(e, c2) {
                  assert.equal(null, e);
                  assert.equal(user2._id.toString(), c2.owner.toString());
                  done();
                });
              });
            });
          });
        });
      });
    });
  });
});


