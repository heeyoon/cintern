/**
 * @author Maddie Dawson
 */
 
// filters searchable rows on the page
//////////////////////////////////////////////////////////////
// Code borrowed from http://jsfiddle.net/giorgitbs/52ak9/1/
//////////////////////////////////////////////////////////////
$(document).on("keyup", "#filter", function(evt) {
	// create case-insensitive regexp
	var regex = new RegExp($(this).val(), 'i');
    $('.searchable tr').hide();
    $('.searchable tr').filter(function() {
        return regex.test($(this).text());
    }).show();
});