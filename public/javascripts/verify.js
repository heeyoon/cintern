/**
 * @author Lynda Tang
 */

// verify an employer accout
$(document).on('click', '#verify-btn', function(evt){
	var token = document.getElementById("token").value;
	$.ajax({
  	type: "POST", 
  	url: '/users/verify?token=' + token,
	}).done(function(response) {
  	$(location).attr('href', '/');
	}).fail(function(response) {
		$('#verify-error').text(JSON.parse(response.responseText).err);
	});
});

