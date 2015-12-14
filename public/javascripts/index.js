/**
 * @author Jennifer Wu
 */
var mainContainer = '#main-container';

$(document).ready(function() {
  loadHomePage();
});

// login the user
$(document).on('submit', '#login-form', function(evt) {
  evt.preventDefault();
  $.ajax({
    type: 'POST',
    url: '/users/login',
    data: helpers.getFormData(this)
  }).done(function(response) {
    location.reload();
  }).fail(function(response) {
    $('#login-error').text(getErrMsg(response));
  });
});

// signup the student
$(document).on('submit', '#s-signup-form', function(evt) {
  evt.preventDefault();
  var formData = helpers.getFormData(this);

  // check that passwords match
  if (formData.password !== formData.confirm) {
    $('#s-signup-error').text('Password and confirmation do not match!');
    return;
  }

  delete formData['confirm'];

  $.ajax({
    type: 'POST',
    url: '/users/students',
    data: formData
  }).done(function(response) {
    location.reload();
  }).fail(function(response) {
    $('#s-signup-error').text(getErrMsg(response));
  });
});

// signup the employer
$(document).on('submit', '#e-signup-form', function(evt) {
  evt.preventDefault();
  var formData = helpers.getFormData(this);
  
  // check that passwords match
  if (formData.password !== formData.confirm) {
    $('#e-signup-error').text('Password and confirmation do not match!');
    return;
  }

  delete formData['confirm'];

  $.ajax({
    type: 'POST',
    url: '/users/employers',
    data: formData
  }).done(function(response) {
    location.reload();
  }).fail(function(response) {
    $('#e-signup-error').text(getErrMsg(response));
  });
});

// clear form on modals when it's hidden
$(document).on('hidden.bs.modal', '.modal', function(evt) {
  $(this).find('form')[0].reset();
});

// loads the home page and its modals
var loadHomePage = function() {
  loadContainer(mainContainer, 'index');
  loadContainer('#login-modal', 'login');
  loadContainer('#employer-signup-modal', 'e_signup');
  loadContainer('#student-signup-modal', 's_signup');
};