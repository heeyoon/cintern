/**
 * @author Jennifer Wu
 *
 * Test file for the application model
 */
var assert = require("assert");
var Application = require('../models/application');
var User = require('../models/User');
var mongoose = require('mongoose');

describe('Application', function() {
  beforeEach(function(done) {
    mongoose.connect('mongodb://localhost/testcintern');
    Application.remove({}, function() {
      done();
    });
  });

  afterEach(function(done) {
    Application.remove({}, function() {
      mongoose.connection.close();
      done();
    });
  });

  /**
   * Input: questions
   *    questions is an empty array : should create
   *    a question in questions is missing the question field : should not create
   *    a question in questions is missing the answer field : should create
   *    a question in questions is missing the required field : should not create
   *    1 question of type dropdown with options : should create
   *    1 question of type radio with no options : should create
   *    1 question of type radio not required : should not create
   *    1 question of type text with no options : should create
   *    1 question of type dropdown with no options : should not create
   *    1 question of type dropdown with 1 option : should not create
   *    1 question of type radio with options : should not create
   *    1 question of type text with options : should not create
   *    1 question of type dropdown with options but wrong answer : should not create
   *    1 question of type radio with wrong answer : should not create
   *    1 question of type radio with right answer : should create
   *    one poorly formatted question : should not create
   *    all correctly formatted questions : should create
   */
  describe('#createApplication', function() {
    it('should create app empty', function(done){
      var questions = [];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          assert.equal(0, apps[0].questions.length);
          done();
        });
      });
    });

    it('should not create app, missing question field', function(done) {
      var questions = [{
        "type" : "text",
        "required" : true,
        "answer" : "abc@gmail.com"
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should create app, missing answer field', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }, {
        "question" : "Name",
        "type" : "text",
        "required" : true,
        "answer" : "Tester Smith"
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          done();
        });
      });
    });

    it('should not create app, missing required field', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "answer" : "abc@gmail.com"
      }, {
        "question" : "Name",
        "type" : "text",
        "required" : true,
        "answer" : "Tester Smith"
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should create app, type dropdown, with options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "dropdown",
        "required" : true,
        "options" : ["a", "b", "c"]
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          done();
        });
      });
    });

    it('should create app, type radio, no options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          done();
        });
      });
    });

    it('should not create app, type radio, not required', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : false
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should create app, type text, no options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          done();
        });
      });
    });

    it('should not create app, type dropdown, no options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "dropdown",
        "required" : true,
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should not create app, type dropdown, 1 options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "dropdown",
        "required" : true,
        "options" : ["a"]
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should not create app, type radio, options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
        "options" : ["a"]
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should not create app, type text, options', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
        "options" : ["a"]
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should not create app, type dropdown, options wrong answer', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "dropdown",
        "required" : true,
        "answer" : "dog",
        "options" : ["a", "b", "c"]
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should not create app, type radio, wrong answer', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
        "answer" : "yum",
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should create app, type radio, right answer', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
        "answer" : "yes",
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          done();
        });
      });
    });

    it('should not create app, one poorly formatted', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
        "answer" : "yes",
      }, {
        "question" : "Email",
        "type" : "radio",
        "required" : true,
        "answer" : "yum",
      }, {
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(0, apps.length);
          done();
        });
      });
    });

    it('should create app, many', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
        "answer" : "yes",
      }, {
        "question" : "Email",
        "type" : "dropdown",
        "required" : true,
        "answer" : "a",
        "options" : ["a", "b", "c"]
      }, {
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          assert.equal(3, apps[0].questions.length);
          done();
        });
      });
    });
  });

  /**
   * Input : appIds
   *    multiple appIds, all appIds are in DB : should delete all
   *    multiple apps, one appId : should delete 1
   *    one appId, appIds are in DB : should delete
   *    appIds are not in DB : should not delete
   */
  describe('#deleteApplications', function() {
    it('should delete application multiple', function(done) {
      var questions = [];
      Application.createApplication(questions, function(e, app1) {
        Application.createApplication(questions, function(e, app2) {
          Application.find({}, function(err, apps) {
            assert.equal(2, apps.length);
            Application.deleteApplications([apps[0]._id, apps[1]._id], function(e) {
              Application.find({}, function(err, apps2) {
                assert.equal(0, apps2.length);
                done();
              });
            });
          });
        }); 
      });
    });

    it('should delete application single with multiple apps', function(done) {
      var questions = [];
      Application.createApplication(questions, function(e, app1) {
        Application.createApplication(questions, function(e, app2) {
          Application.find({}, function(err, apps) {
            assert.equal(2, apps.length);
            Application.deleteApplications([apps[0]._id], function(e) {
              Application.find({}, function(err, apps2) {
                assert.equal(1, apps2.length);
                done();
              });
            });
          });
        }); 
      });
    });


    it('should delete application single', function(done) {
      var questions = [];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          Application.deleteApplications([apps[0]._id], function(e) {
            Application.find({}, function(err, apps2) {
              assert.equal(0, apps2.length);
              done();
            });
          });
        });
      });
    });

    it('should not delete application', function(done) {
      var questions = [];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          if(apps[0]._id !== 0) {
            Application.deleteApplications([1], function(e) {
              Application.find({}, function(err, apps2) {
                assert.equal(1, apps2.length);
                done();
              });
            });
          }
        });
      });
    });
  });
  
  /**
   * Inputs: appId, answers, isSubmission
   *    id in answers is not an id : should error
   *    appId is not valid : should error
   *    wrong answer field for dropdown : should error
   *    right answer field for dropdown : should update
   *    wrong answer field for radio : should error
   *    right answer field for radio : should update
   *    update an already filled answer : should update
   *    isSubmission is false, not all required filled : should update
   *    isSubmission is true, but not all required filled : should error
   *    isSubmission is true, all required filled : should update
   *    missing one answer : should error
   */
  describe('#updateAnswers', function() {
    it('should not update if id wrong in answers', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }, {
        "question" : "Email2",
        "type" : "text",
        "required" : true,
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          var answers = [
            { "_id" : apps[0].questions[0]._id, "answer" : "yum" }, 
            { "_id" : 2, "answer" : "a2" }
          ];
          Application.updateAnswers(apps[0]._id, answers, false, function(e, app) {
            assert.equal(true, e !== null);
            Application.find({}, function(err, apps) {
              var app = apps[0];
              assert.equal('', app.questions[0].answer);
              assert.equal('', app.questions[1].answer);
              done();
            });
          });
        });
      });
    });

    it('should not update if appId is wrong', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }, {
        "question" : "Email2",
        "type" : "text",
        "required" : true,
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          var answers = [
            { "_id" : apps[0].questions[0]._id, "answer" : "yum" }, 
            { "_id" : "abc", "answer" : "a2" }
          ];
          Application.updateAnswers(2, answers, false, function(e, app) {
            assert.equal(true, e !== null);
            Application.find({}, function(err, apps) {
              var app = apps[0];
              assert.equal('', app.questions[0].answer);
              assert.equal('', app.questions[1].answer);
              done();
            });
          });
        });
      });
    });

    it('should not update if wrong answer field, dropdown', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "dropdown",
        "required" : true,
        "options" : ["a", "b", "c"]
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          var answers = [{ "_id" : apps[0].questions[0]._id, "answer" : "yum" }];
          Application.updateAnswers(apps[0]._id, answers, false, function(e, app) {
            assert.equal(true, e !== null);
            Application.find({}, function(err, apps) {
              var app = apps[0];
              assert.equal('', app.questions[0].answer);
              done();
            });
          });
        });
      });
    });

    it('should update if right answer field, dropdown', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "dropdown",
        "required" : true,
        "options" : ["a", "b", "c"]
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          var answers = [{ "_id" : apps[0].questions[0]._id, "answer" : "a" }];
          Application.updateAnswers(apps[0]._id, answers, false, function(e, app2) {
            assert.equal(null, e);
            assert.equal("a", app2.questions[0].answer);
            done();
          });
        });
      });
    });

    it('should not update if wrong answer field, radio', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          var answers = [{ "_id" : apps[0].questions[0]._id, "answer" : "yum" }];
          Application.updateAnswers(apps[0]._id, answers, false, function(e, app) {
            assert.notEqual(null, e);
            Application.find({}, function(err, apps) {
              var app = apps[0];
              assert.equal('', app.questions[0].answer);
              done();
            });
          });
        });
      });
    });

    it('should update if right answer field, radio', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "radio",
        "required" : true,
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          var answers = [{ "_id" : apps[0].questions[0]._id, "answer" : "yes" }];
          Application.updateAnswers(apps[0]._id, answers, false, function(e, app) {
            assert.equal(null, e);
            assert.equal("yes", app.questions[0].answer);
            done();
          });
        });
      });
    });

    it('should update already filled answer', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
        "answer" : "dog"
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          var answers = [{ "_id" : apps[0].questions[0]._id, "answer" : "yum" }];
          Application.updateAnswers(apps[0]._id, answers, false, function(e, app) {
            assert.equal(null, e);
            assert.equal("yum", app.questions[0].answer);
            done();
          });
        });
      });
    });

    it('should update isSubmission false, not all required filled', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }, {
        "question" : "Email2",
        "type" : "text",
        "required" : true,
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          var answers = [
            { "_id" : apps[0].questions[0]._id, "answer" : "yum" }, 
            { "_id" : apps[0].questions[1]._id, "answer" : "" }
          ];
          Application.updateAnswers(apps[0]._id, answers, false, function(e, app) {
            assert.equal(null, e);
            assert.equal("yum", app.questions[0].answer);
            assert.equal('', app.questions[1].answer);
            done();
          });
        });
      });
    });

    it('should not update isSubmission true, not all required filled', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }, {
        "question" : "Email2",
        "type" : "text",
        "required" : true,
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          var answers = [
            { "_id" : apps[0].questions[0]._id, "answer" : "yum" }, 
            { "_id" : apps[0].questions[1]._id, "answer" : "" }
          ];
          Application.updateAnswers(apps[0]._id, answers, true, function(e, app) {
            Application.find({}, function(err, apps) {
              var app = apps[0];
              assert.equal('', app.questions[0].answer);
              assert.equal('', app.questions[1].answer);
              done();
            });
          });
        });
      });
    });

    it('should update isSubmission true, all required filled', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }, {
        "question" : "Email2",
        "type" : "text",
        "required" : true,
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          var answers = [
            { "_id" : apps[0].questions[0]._id, "answer" : "yum" }, 
            { "_id" : apps[0].questions[1]._id, "answer" : "a" }
          ];
          Application.updateAnswers(apps[0]._id, answers, true, function(e, app) {
            Application.find({}, function(err, apps) {
              var app = apps[0];
              assert.equal('yum', app.questions[0].answer);
              assert.equal('a', app.questions[1].answer);
              done();
            });
          });
        });
      });
    });

    it('should not update missing', function(done) {
      var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }, {
        "question" : "Email2",
        "type" : "text",
        "required" : true,
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          var answers = [
            { "_id" : apps[0].questions[0]._id, "answer" : "yum" }
          ];
          Application.updateAnswers(apps[0]._id, answers, false, function(e, app) {
            Application.find({}, function(err, apps) {
              var app = apps[0];
              assert.equal('', app.questions[0].answer);
              assert.equal('', app.questions[1].answer);
              done();
            });
          });
        });
      });
    });
  });

  /**
   * Inputs: 
   *    app is created without answer field questions
   *    app is created with answer field in questions
   */
   describe('#formatForShow', function() {
    it('no answer field in questions, should have answer field in formatted version', function(done) {
       var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          Application.formatForShow(apps[0]._id, function(errMsg, formattedApps) {
            assert.equal(1, formattedApps.length);
            var formattedApp = formattedApps[0];
            assert.equal('', formattedApp.answer);
            assert.equal('Email', formattedApp.question);
            assert.equal('text', formattedApp.type);
            assert.equal(true, formattedApp.required);
            assert.equal(0, formattedApp.options.length);
            done();
          });
        });
      });
    });

    it('answer field in questions, should have answer field in formatted version', function(done) {
       var questions = [{
        "question" : "Email",
        "type" : "text",
        "required" : true,
        "answer" : "abc@gmail.com"
      }];
      Application.createApplication(questions, function(e, app) {
        Application.find({}, function(err, apps) {
          assert.equal(1, apps.length);
          Application.formatForShow(apps[0]._id, function(errMsg, formattedApps) {
            assert.equal(1, formattedApps.length);
            var formattedApp = formattedApps[0];
            assert.equal('abc@gmail.com', formattedApp.answer);
            assert.equal('Email', formattedApp.question);
            assert.equal('text', formattedApp.type);
            assert.equal(true, formattedApp.required);
            assert.equal(0, formattedApp.options.length);
            done();
          });
        });
      });
    });
  });
});


