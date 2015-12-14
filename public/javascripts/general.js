/**
 * @author Jennifer Wu, Maddie Dawson, and Heeyoon Kim
 */

//////////////////////////////////////////////////////////////////////
// Handlebar helper functions
// @author Jennifer Wu and Heeyoon Kim
//////////////////////////////////////////////////////////////////////
Handlebars.registerPartial('listing', Handlebars.templates['s_listing_row']);
Handlebars.registerPartial('s_dash_page_app', Handlebars.templates['s_dash_page_app']);
Handlebars.registerPartial('application', Handlebars.templates['application']);
Handlebars.registerPartial('question', Handlebars.templates['question']);
Handlebars.registerPartial('e_dash_page_listing', Handlebars.templates['e_dash_page_listing']);
Handlebars.registerPartial('applicant', Handlebars.templates['e_applicants_row']);
Handlebars.registerPartial('filter_bar', Handlebars.templates['filter_bar']);

// interprets states for display
Handlebars.registerHelper("interpretState", function(state) {
  if (state === "subm") return "Submitted";
  if (state === "save") return "Saved";
  if (state === "with") return "Withdrawn";
  if (state === "rej") return "Rejected";
});

//////////////////////////////////////////////////////////////////////
// code borroed from http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/
//////////////////////////////////////////////////////////////////////
//
// checks if lvalue equals rvalue
Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
  if (arguments.length < 3) {
    throw new Error("Handlebars Helper equal needs 2 parameters");
  }
  if (lvalue!=rvalue) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

// checks if date is in the future
Handlebars.registerHelper('deadlineNotPassed', function(date, options) {
  if (arguments.length < 2) {
    throw new Error("Handlebars Helper deadlineNotPassed need 1 parameter");
  }
  if (new Date(date) < Date.now()) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

// Nicely formats ISO date to MM/DD/YYYY
Handlebars.registerHelper('formatDate', function(ISODate, format) {
  if (arguments.length < 2) {
    throw new Error("Handlebars Helper formatDate needs 1 paramater");
  }
  else {
    var monthDict = { 0 : "Jan", 1 : "Feb", 2 : "Mar", 3 : "Apr", 4 : "May", 5 : "Jun", 6 : "Jul", 7 : "Aug", 8 : "Sept", 9 : "Oct", 10 : "Nov", 11 : "Dec"};
    
    var date = new Date(ISODate);
    var day = date.getDate();
    var month = monthDict[date.getMonth()];
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    return month + ' ' + day + ',  ' + year + ' ' + formattedTime(hours, minutes);
  }
});

// checks if item is in list
Handlebars.registerHelper('in', function(list, item, options) {
  if (arguments.length < 3) {
    throw new Error("Handlebars Helper equal needs 2 parameters");
  }
  if ($.inArray(item, list) >= 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

// returns the value in obj associated with key
Handlebars.registerHelper('getValue', function(obj, key) {
  return (obj[key]);
});

// converts obj to a JSON string
Handlebars.registerHelper('toJson', function(obj) {
  return JSON.stringify(obj);
})

/**
 * @param{num} is a 1 or 2 digit integer
 * @return if num is 1 digit, a string with a 0 then num otherwise, num
 */
var twoDigitNum = function(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num.toString();
  }
};

/**
 * @param{num} hours
 * @param{num} minutes
 * @return String of format HH:MM
 */
var formattedTime = function(hours, minutes) {
  if (hours < 13) {
    return twoDigitNum(hours) + ":" + twoDigitNum(minutes) + " am";
  } else {
    return twoDigitNum(hours-12) + ":" + twoDigitNum(minutes) + " pm";
  }
};


//////////////////////////////////////////////////////////////////////
// CSURF Helper
// @author Maddie Dawson
//////////////////////////////////////////////////////////////////////
/**
 * Given some form data, remove the csurf token and return the token and the
 * remaining form data in an array
 *
 * @param{formData} an object representing form data
 */
var extractCsurfToken = function(formData) {
  var csrfToken = formData._csrf;
  delete formData._csrf;
  return [csrfToken, formData];
};


//////////////////////////////////////////////////////////////////////
// Container loading
// @author Jennifer
//////////////////////////////////////////////////////////////////////
/**
 * This function loads the Handlebar template called template initialized
 * with data into the container
 *
 * @param{String} container
 * @param{String} template
 * @param{Object} data
 */
var loadContainer = function(container, template, data) {
	data = data || {};
	$(container).html(Handlebars.templates[template](data));
};

/** 
 * This function loads the Handlebar template called error with "error"
 * initialized with the error message from the response into the container
 * 
 * @param{String} container
 * @param{Object} response
 */
var loadError = function(container, response) {
  loadContainer(mainContainer, 'error', {
    error : getErrMsg(response)
  });
};

// Loads typeahead feature of the dropdowns
var loadDropdowns = function() {
  var typeaheads = $('.typeahead');
  for ( var i = 0; i < typeaheads.length; i++ ) {
    var typeahead = typeaheads[i];
    var id = typeahead.id;
    var answer = $('#' + id).data('answer');
    var options = $('#' + id).data('options');

    $('#' + id).val(answer);
    $('#' + id).typeahead({
      hint: true,
      highlight: true,
      minLength: 0,
    },
    {
        source: substringMatcher(options),
        limit: options.length
    });
  };
}

/**
 * @param{Object} response 
 * @return String error message from the respnose
 */
var getErrMsg = function(response) {
  return (JSON.parse(response.responseText).err);
};

//////////////////////////////////////////////////////////////////////
// code borrowed from https://twitter.github.io/typeahead.js/examples/ 
//////////////////////////////////////////////////////////////////////
//
// used to help match substrings in typeahead dropdown
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

// When the logout button has been clicked, logout the user
$(document).on('click', '#logout-btn', function(evt){
  $.ajax({
    type: "POST", 
    url: '/users/logout'
  }).done(function(){
    $(location).attr('href', '/');
  });
});