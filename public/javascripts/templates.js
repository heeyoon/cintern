(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['application'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "	<div class=\"form-group\">\n"
    + ((stack1 = container.invokePartial(partials.question,depth0,{"name":"question","hash":{"isInProgress":(depths[1] != null ? depths[1].isInProgress : depths[1])},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "	<p>No Questions!</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<!-- author: Jennifer Wu and Lynda Tang -->\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.questions : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(3, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useDepths":true});
templates['e_applicants'] = template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    return "          <th>"
    + container.escapeExpression(container.lambda(blockParams[0][0], depth0))
    + "</th>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.applicant,depth0,{"name":"applicant","hash":{"csrfToken":(depths[1] != null ? depths[1].csrfToken : depths[1]),"headers":(depths[1] != null ? depths[1].headers : depths[1]),"listing":(depths[1] != null ? depths[1].listingId : depths[1])},"data":data,"indent":"          ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "          <tr>\n            <td>No applicants have applied yet.</td>\n          </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!-- author: Maddie Dawson -->\n\n<div>\n  <a href=\"/\" id=\"home-link\">Back to Dash</a>\n\n  <div class=\"error\" id=\"e-applicants-error\"></div>\n\n  <!-- Applicant Modal -->\n  <div class=\"modal fade\" id=\"applicantModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" data-listing-id=\""
    + alias4(((helper = (helper = helpers.listingId || (depth0 != null ? depth0.listingId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"listingId","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n          <h4 class=\"modal-title\" id=\"applicant-modal-header\"></h4>\n        </div>\n        <div class=\"modal-body\" id=\"applicant-modal-content\"></div>\n      </div>\n    </div>\n  </div>\n\n\n  <h2>Applicants</h2>\n  \n  <p>Currently "
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.applicants : depth0)) != null ? stack1.length : stack1), depth0))
    + " students have applied to this listing.</p>\n\n"
    + ((stack1 = container.invokePartial(partials.filter_bar,depth0,{"name":"filter_bar","data":data,"blockParams":blockParams,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n  <form action=\"/process\" method=\"POST\" id=\"star-app-form\" data-listing-id="
    + alias4(((helper = (helper = helpers.listingId || (depth0 != null ? depth0.listingId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"listingId","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + ">\n    <input type=\"hidden\" name=\"_csrf\" value=\""
    + alias4(((helper = (helper = helpers.csrfToken || (depth0 != null ? depth0.csrfToken : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"csrfToken","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\">\n\n    <table class=\"table table-hover table-condensed tablesorter\" id=\"e-applicants-table\">\n      \n      <thead class=\"clickable-headers\">\n\n        <!-- header for star -->\n        <th></th>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.headers : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\n        <th>Submit Time</th>\n\n      </thead>\n      \n      <tbody class=\"searchable\">\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.applicants : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.program(5, data, 0, blockParams, depths),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\n      </tbody>\n\n    </table>\n  </form>\n\n  <form action=\"/process\" method=\"POST\" id=\"delete-listing-form\" data-listing-id="
    + alias4(((helper = (helper = helpers.listingId || (depth0 != null ? depth0.listingId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"listingId","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + ">\n    <input type=\"hidden\" name=\"_csrf\" value=\""
    + alias4(((helper = (helper = helpers.csrfToken || (depth0 != null ? depth0.csrfToken : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"csrfToken","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\">\n    <input type=\"submit\" class=\"btn btn-primary\" id=\"delete-listing-btn\" value=\"Delete Listing\"/>\n  </form>\n</div>\n";
},"usePartial":true,"useData":true,"useDepths":true,"useBlockParams":true});
templates['e_applicants_row'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "		<td class=\"unstar-applicant-cell\" tooltip=\"Unstar\">\n			<span class=\"hidden\">1</span>\n			<span class=\"glyphicon glyphicon-star star small-star\"></span>\n		</td>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "		<td class=\"star-applicant-cell\" tooltip=\"Star\">\n			<span class=\"hidden\">0</span>\n			<span class=\"glyphicon glyphicon-star center unstar small-star\"></span>\n		</td>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "  		<td class=\"applicant-cell\">"
    + container.escapeExpression((helpers.getValue || (depth0 && depth0.getValue) || helpers.helperMissing).call(depth0 != null ? depth0 : {},depths[1],depth0,{"name":"getValue","hash":{},"data":data}))
    + "</td>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!-- author: Maddie Dawson -->\n\n<tr class=\"clickable\" data-applicant-id=\""
    + alias4(((helper = (helper = helpers.owner || (depth0 != null ? depth0.owner : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"owner","hash":{},"data":data}) : helper)))
    + "\" data-listing-id=\""
    + alias4(((helper = (helper = helpers.listing || (depth0 != null ? depth0.listing : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"listing","hash":{},"data":data}) : helper)))
    + "\" data-custom-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isStar : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(3, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.headers : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n	<td class=\"applicant-cell\">"
    + alias4((helpers.formatDate || (depth0 && depth0.formatDate) || alias2).call(alias1,(depth0 != null ? depth0.submitTime : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</td>\n</tr>";
},"useData":true,"useDepths":true});
templates['e_create_listing'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<!-- author: Jennifer Wu and Lynda Tang -->\n \n<div class=\"error\" id = \"e-create-listing-error\"></div>\n\n<form action=\"/process\" method=\"POST\" id=\"create-listing\">\n	<input type=\"hidden\" name=\"_csrf\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.csrfToken || (depth0 != null ? depth0.csrfToken : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"csrfToken","hash":{},"data":data}) : helper)))
    + "\">\n\n	<label>Position Title:</label>\n	<span class=\"required\">*</span>\n	<input class=\"form-control\" type=\"text\" name=\"title\" required>\n\n    <label>Deadline:</label>\n	<span class=\"required\">*</span>\n	<div class='form-group input-group date' id='datetimepicker1'>\n	    <input type='text' class=\"form-control\" name=\"deadline\" required/>\n	    <span class=\"input-group-addon\">\n	        <span class=\"glyphicon glyphicon-calendar\"></span>\n	    </span>\n	</div>\n	\n	<div class=\"panel-group\" id=\"create-listing-accordion\">\n		<div class=\"panel panel-default\">\n			<div class=\"panel-heading\">\n				<h4 class=\"panel-title\">\n					<a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#create-listing-accordion\" href=\"#optional-info-panel\">\n						Optional Listing Information\n					</a>\n				</h4>\n			</div>\n			<div id=\"optional-info-panel\" class=\"panel-collapse collapse\">\n				<div class=\"panel-body\">\n					<label>Description:</label>\n					<textarea \n						rows=\"8\" \n						name=\"description\" \n						class=\"form-control\"\n						placeholder=\"Enter description here...\"></textarea>\n\n					<label>Requirements:</label>\n					<textarea \n						rows=\"8\" \n						name=\"requirements\" \n						class=\"form-control\"\n						placeholder=\"Enter requirements here...\"></textarea>\n				</div>\n			</div>\n		</div>\n\n		<div class=\"panel panel-default\">\n			<div class=\"panel-heading\">\n				<h4 class=\"panel-title\">\n					<a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#create-listing-accordion\" href=\"#questions-panel\">\n						Custom Questions\n					</a>\n				</h4>\n			</div>\n			<div id=\"questions-panel\" class=\"panel-collapse collapse\">\n				<div class=\"panel-body\">\n					<div>\n\n						<div id=\"question-list\"></div>\n						<div class=\"pull-right dropdown-hover\">\n							<!-- trigger button -->\n						    <button type=\"button\" class=\"btn btn-primary\">\n						    	<span class=\"glyphicon glyphicon-plus\"></span> Add Question\n						    </button>\n\n						    <!-- dropdown menu -->\n						    <ul class=\"dropdown-menu\">\n						        <li class=\"clickable\"><a id=\"add-text-question\">Text Question</a></li>\n						        <li class=\"clickable\"><a id=\"add-radio-question\">Yes or No Question</a></li>\n						    </ul>\n					    </div>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n       \n	<button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n\n</form>\n";
},"useData":true});
templates['e_dash_page'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.e_dash_page_listing,depth0,{"name":"e_dash_page_listing","hash":{"numApplicantsMap":(depths[1] != null ? depths[1].numApplicantsMap : depths[1]),"listingid":((stack1 = blockParams[0][0]) != null ? stack1._id : stack1),"listing":blockParams[0][0]},"data":data,"blockParams":blockParams,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "        <tr>\n        	<td>No listings yet!</td>\n        </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<!-- author: Maddie Dawson -->\n\n<div>\n  <h2>Welcome!</h2>\n\n  <button class=\"btn btn-primary pull-right\" data-toggle=\"modal\" data-target=\"#new-listing-modal\">\n    <span class=\"glyphicon glyphicon-plus\"></span> Add New Listing\n  </button>\n  \n  <!-- New Listing Modal -->\n  <div class=\"modal fade\" id=\"new-listing-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n          <h4 class=\"modal-title\">New Listing</h4>\n        </div>\n        <div class=\"modal-body\" id=\"new-listing-modal-content\"></div>\n      </div>\n    </div>\n  </div>\n\n  <p>Here are your listings:</p>\n\n  <br>\n  <br>\n\n"
    + ((stack1 = container.invokePartial(partials.filter_bar,depth0,{"name":"filter_bar","data":data,"blockParams":blockParams,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n  <table class=\"table table-hover table-condensed tablesorter\" id=\"e-dash-table\">\n\n    <thead class=\"clickable-headers\">\n  	  <th>Title</th>\n      <th>Number of applicants</th>\n      <th>Deadline</th>\n  	</thead>\n\n    <tbody class=\"searchable\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.listings : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams, depths),"inverse":container.program(3, data, 0, blockParams, depths),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "    </tbody>\n  \n  </table>\n</div>";
},"usePartial":true,"useData":true,"useDepths":true,"useBlockParams":true});
templates['e_dash_page_listing'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<!-- author: Maddie Dawson -->\n\n<tr class=\"clickable listing-row\" data-listing-id="
    + alias3(((helper = (helper = helpers.listingid || (depth0 != null ? depth0.listingid : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"listingid","hash":{},"data":data}) : helper)))
    + ">\n  <td>"
    + alias3(container.lambda(((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1.title : stack1), depth0))
    + "</td>\n  <td>"
    + alias3((helpers.getValue || (depth0 && depth0.getValue) || alias2).call(alias1,(depth0 != null ? depth0.numApplicantsMap : depth0),(depth0 != null ? depth0.listingid : depth0),{"name":"getValue","hash":{},"data":data}))
    + "</td>\n  <td>"
    + alias3((helpers.formatDate || (depth0 && depth0.formatDate) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1.deadline : stack1),{"name":"formatDate","hash":{},"data":data}))
    + "</td>\n</tr>\n";
},"useData":true});
templates['e_full_app'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=container.lambda;

  return "				<button type=\"button\" class=\"unstar-custom-btn btn btn-default\" data-custom-id=\""
    + alias1(((helper = (helper = helpers.customId || (depth0 != null ? depth0.customId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"customId","hash":{},"data":data}) : helper)))
    + "\" data-listing-id=\""
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1._id : stack1), depth0))
    + "\" data-user-id=\""
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1._id : stack1), depth0))
    + "\">\n					<span class='glyphicon glyphicon-star center star'></span>\n				</button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=container.lambda;

  return "				<button type=\"button\" class=\"star-custom-btn btn btn-default\" data-custom-id=\""
    + alias1(((helper = (helper = helpers.customId || (depth0 != null ? depth0.customId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"customId","hash":{},"data":data}) : helper)))
    + "\" data-listing-id=\""
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1._id : stack1), depth0))
    + "\" data-user-id=\""
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1._id : stack1), depth0))
    + "\">\n					<span class='glyphicon glyphicon-star center unstar'></span>\n				</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<!-- author: Jennifer Wu -->\n\n<div class=\"full-app\">\n	<div class=\"error\" id = \"e-full-app-error\"></div>\n\n	<div class=\"pull-right\">\n		<form action=\"/process\" method=\"POST\" id=\"change-status-form\">\n			<input type=\"hidden\" name=\"_csrf\" value=\""
    + alias4(((helper = (helper = helpers.csrfToken || (depth0 != null ? depth0.csrfToken : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"csrfToken","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isStar : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n			<button type=\"button\" id=\"reject-custom-btn\" class=\"btn btn-danger\" data-custom-id=\""
    + alias4(((helper = (helper = helpers.customId || (depth0 != null ? depth0.customId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"customId","hash":{},"data":data}) : helper)))
    + "\" data-listing-id=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1._id : stack1), depth0))
    + "\" data-user-id=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1._id : stack1), depth0))
    + "\">\n				Reject\n			</button>\n		</form>\n	</div>\n\n	<label>Email:</label> "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1.email : stack1), depth0))
    + "\n\n	<br>\n	<br>\n\n	<div class=\"panel-group\" id=\"full-app-accordion\">\n		<div class=\"panel panel-default\">\n			<div class=\"panel-heading\">\n				<h4 class=\"panel-title\">\n					<a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#full-app-accordion\" href=\"#common-panel\">\n						Common Application\n					</a>\n				</h4>\n			</div>\n			<div id=\"common-panel\" class=\"panel-collapse collapse\">\n				<div class=\"panel-body\">\n"
    + ((stack1 = container.invokePartial(partials.application,(depth0 != null ? depth0.common : depth0),{"name":"application","hash":{"isCommon":true,"isSubmitted":(depth0 != null ? depth0.isSubmitted : depth0)},"data":data,"indent":"\t\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "				</div>\n			</div>\n		</div>\n		<div class=\"panel panel-default\">\n			<div class=\"panel-heading\">\n				<h4 class=\"panel-title\">\n					<a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#full-app-accordion\" href=\"#custom-panel\">\n						Custom Application\n					</a>\n				</h4>\n			</div>\n			<div id=\"custom-panel\" class=\"panel-collapse collapse\">\n				<div class=\"panel-body\">\n"
    + ((stack1 = container.invokePartial(partials.application,(depth0 != null ? depth0.custom : depth0),{"name":"application","hash":{"isCommon":false,"isSubmitted":(depth0 != null ? depth0.isSubmitted : depth0)},"data":data,"indent":"\t\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "				</div>\n			</div>\n		</div>		\n	</div>\n</div>";
},"usePartial":true,"useData":true});
templates['e_signup'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- author: Lynda Tang -->\n\n<div id=\"e-signup\">\n\n  <div class=\"error\" id = \"e-signup-error\"></div>\n\n  <form id=\"e-signup-form\" class=\"form-horizontal\">\n    <div class=\"form-group\">\n      <label class=\"control-label col-xs-4\">Email:</label>\n      <div class=\"col-xs-8\">\n        <input class=\"form-control\" type=\"email\" name=\"email\" required placeholder=\"Email\"/>\n      </div>\n    </div>\n\n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-4\">Company:</label>\n      <div class=\"col-xs-8\">\n        <input class=\"form-control\" type=\"text\" name=\"company\" required placeholder=\"Company\"/>\n      </div>\n    </div>\n    \n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-4\">Password:</label>\n      <div class=\"col-xs-8\">\n        <input class=\"form-control\" type=\"password\" name=\"password\" required placeholder=\"Password\"/>\n      </div>\n    </div>\n    \n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-4\">Confirm Password:</label>\n      <div class=\"col-xs-8\">\n        <input class=\"form-control\" type=\"password\" name=\"confirm\" required placeholder=\"Password\"/>\n      </div>\n    </div>\n    \n    <div class=\"form-group\">\n      <div class=\"col-xs-offset-4 col-xs-6\">\n        <input class=\"btn btn-primary\" type=\"submit\" />\n      </div>\n    </div> \n  \n  </form>\n</div>\n";
},"useData":true});
templates['error'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<h3>You have run into the following error: "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "</h3>";
},"useData":true});
templates['filter_bar'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- author: Maddie Dawson -->\n\n<div class=\"input-group\"> \n	<span class=\"input-group-addon\">Filter</span>\n    <input class=\"form-control\" id=\"filter\" type=\"text\" placeholder=\"Type here...\">\n</div>\n\n<br>";
},"useData":true});
templates['index'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- author: Lynda Tang -->\n\n<div>\n  <div class=\"login-area layer\">\n  <button type=\"button\" class=\"btn btn-primary\" id=\"login-btn\" data-toggle=\"modal\" data-target=\"#loginModal\">\n    Login\n  </button>\n  </div>\n</div>\n\n<div class=\"container container-table\">\n  <div class=\"row vertical-center-row\">\n    <div class=\"text-center col-md-6 col-md-offset-3\">\n      <div class=\"layer\">\n        <h1>Cintern!</h1>\n        <p>You must be signed in to continue.</p>\n        \n        <br>\n        \n        <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#studentSignupModal\">\n          Sign Up as Student\n        </button>\n        \n        <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#employerSignupModal\">\n          Sign Up as Employer\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Login Modal -->\n<div class=\"modal fade\" id=\"loginModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\">Login</h4>\n      </div>\n      <div class=\"modal-body\" id=\"login-modal\"></div>\n    </div>\n  </div>\n</div>\n\n<!-- Employer SignUp -->\n<div class=\"modal fade\" id=\"employerSignupModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\">Employer Sign Up</h4>\n      </div>\n      <div class=\"modal-body\" id=\"employer-signup-modal\"></div>\n    </div>\n  </div>\n</div>\n\n<!-- Student SignUp -->\n<div class=\"modal fade\" id=\"studentSignupModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\">Student Sign Up</h4>\n      </div>\n      <div class=\"modal-body\" id=\"student-signup-modal\"></div>\n    </div>\n  </div>\n</div>\n\n";
},"useData":true});
templates['login'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- author: Lynda Tang -->\n\n<div id=\"signin\">\n\n  <div class=\"error\" id=\"login-error\"></div>\n  \n  <form id=\"login-form\" class=\"form-horizontal\">\n    <div class=\"form-group\">\n      <label class=\"control-label col-xs-4\">Email:</label>\n      <div class=\"col-xs-8\">\n        <input class=\"form-control\" type=\"email\" name=\"email\" required placeholder=\"Email\"/>\n      </div>\n    </div>\n\n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-4\">Password:</label>\n      <div class=\"col-xs-8\">\n        <input class=\"form-control\" type=\"password\" name=\"password\" required placeholder=\"Password\"/>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <div class=\"col-xs-offset-4 col-xs-6\">\n        <input class=\"btn btn-primary\" type=\"submit\" />\n      </div>\n    </div> \n\n  </form>\n\n</div>\n";
},"useData":true});
templates['question'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "		<span class=\"required\">*</span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<textarea \n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isInProgress : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "			\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.required : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "			\n			class=\"form-control\" name=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.answer || (depth0 != null ? depth0.answer : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"answer","hash":{},"data":data}) : helper)))
    + "</textarea>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "				disabled\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "				required\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<input \n			type=\"text\"\n			name=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\"\n			id=\""
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" \n			class=\"typeahead form-control\"\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.required : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isInProgress : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "\" \n			data-options=\""
    + alias4((helpers.toJson || (depth0 && depth0.toJson) || alias2).call(alias1,(depth0 != null ? depth0.options : depth0),{"name":"toJson","hash":{},"data":data}))
    + "\" \n			data-answer=\""
    + alias4(((helper = (helper = helpers.answer || (depth0 != null ? depth0.answer : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"answer","hash":{},"data":data}) : helper)))
    + "\">\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "				disabled\n			";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<input \n			type=\"radio\" name=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" value=\"\"\n"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.answer : depth0),"",{"name":"equal","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " style=\"display:none\">\n\n		<input \n			type=\"radio\" name=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" value=\"yes\"\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isInProgress : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.answer : depth0),"yes",{"name":"equal","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">Yes\n		<input \n			type=\"radio\" name=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" value=\"no\"\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isInProgress : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.answer : depth0),"no",{"name":"equal","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">No\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "				checked\n			";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!-- author: Jennifer Wu -->\n\n<div class=\"question\" id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" data-type=\""
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\"> \n	<label for=\""
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"control-label\">"
    + alias4(((helper = (helper = helpers.question || (depth0 != null ? depth0.question : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question","hash":{},"data":data}) : helper)))
    + "</label>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.required : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"text",{"name":"equal","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"dropdown",{"name":"equal","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"radio",{"name":"equal","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
templates['s_common'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "			<input type=\"submit\" class=\"btn btn-primary\"/>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<!-- author: Jennifer Wu -->\n\n<div class=\"error\" id = \"s-common-error\"></div>\n\n<div>\n\n	<h2>Common Application</h2>\n\n	<form action=\"/process\" method=\"POST\" id=\"submit-common-form\">\n		<input type=\"hidden\" name=\"_csrf\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.csrfToken || (depth0 != null ? depth0.csrfToken : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"csrfToken","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = container.invokePartial(partials.application,depth0,{"name":"application","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isInProgress : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "	</form>\n	\n</div>";
},"usePartial":true,"useData":true});
templates['s_custom'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "		<button type=\"button\" id=\"save-custom-btn\" class=\"btn btn-primary\" >Save</button>\n		<input type=\"submit\" class=\"btn btn-primary\"/>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<button type=\"button\" id=\"delete-custom-btn\" class=\"pull-right btn btn-danger\" data-custom-id=\""
    + container.escapeExpression(((helper = (helper = helpers.customId || (depth0 != null ? depth0.customId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"customId","hash":{},"data":data}) : helper)))
    + "\"><span class='glyphicon glyphicon-trash'></span> Delete</button>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<button type=\"button\" id=\"withdraw-custom-btn\" class=\"pull-right btn btn-danger\" data-custom-id=\""
    + container.escapeExpression(((helper = (helper = helpers.customId || (depth0 != null ? depth0.customId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"customId","hash":{},"data":data}) : helper)))
    + "\">Withdraw</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!-- author: Jennifer Wu -->\n\n<div class=\"error\" id = \"s-custom-error\"></div>\n\n<form action=\"/process\" method=\"POST\" id=\"submit-custom-form\" data-custom-id=\""
    + alias4(((helper = (helper = helpers.customId || (depth0 != null ? depth0.customId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"customId","hash":{},"data":data}) : helper)))
    + "\" data-listing-id=\""
    + alias4(((helper = (helper = helpers.listing || (depth0 != null ? depth0.listing : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"listing","hash":{},"data":data}) : helper)))
    + "\">\n	<input type=\"hidden\" name=\"_csrf\" value=\""
    + alias4(((helper = (helper = helpers.csrfToken || (depth0 != null ? depth0.csrfToken : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"csrfToken","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = container.invokePartial(partials.application,depth0,{"name":"application","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.state : depth0),"save",{"name":"equal","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.state : depth0),"save",{"name":"equal","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.state : depth0),"subm",{"name":"equal","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</form>\n\n";
},"usePartial":true,"useData":true});
templates['s_dash_page'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.s_dash_page_app,depth0,{"name":"s_dash_page_app","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        \n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <tr>\n        	<td>No applications yet!</td>\n        </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<!-- author: Heeyoon Kim -->\n\n<div class=\"error\" id = \"s-dash-error\"></div>\n\n<div>\n\n  <!-- Custom Modal -->\n  <div class=\"modal fade\" id=\"customModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n          <h4 class=\"modal-title\" id=\"custom-modal-header\"></h4>\n        </div>\n        <div class=\"modal-body\" id=\"custom-modal-content\"></div>\n      </div>\n    </div>\n  </div>\n\n  <h2>Welcome!</h2>\n  <p>You currently have "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.apps : depth0)) != null ? stack1.length : stack1), depth0))
    + " applications. Remember you can only be submitted to up to 40 listings.</p>\n\n  <br>\n  \n"
    + ((stack1 = container.invokePartial(partials.filter_bar,depth0,{"name":"filter_bar","data":data,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "  \n  <table class=\"table table-hover table-condensed tablesorter\" id=\"s-dash-table\">\n  	\n    <thead class=\"clickable-headers\">\n  	  <th>Company</th>\n  	  <th>Title</th>\n      <th>Deadline</th>\n      <th>Submitted Time</th>\n  	  <th>Status</th>\n  	</thead>\n\n    <tbody class=\"searchable\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.apps : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </tbody>\n  \n  </table>\n</div>";
},"usePartial":true,"useData":true});
templates['s_dash_page_app'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "  <tr class=\"clickable student-custom\" data-listing-id=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1._id : stack1), depth0))
    + "\">\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<tr class=\"clickable student-custom error\" data-listing-id=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1._id : stack1), depth0))
    + "\">\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "  <td></td>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "  <td>"
    + container.escapeExpression((helpers.formatDate || (depth0 && depth0.formatDate) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.submitTime : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</td>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.lambda, alias4=container.escapeExpression;

  return "<!-- author: Heeyoon Kim -->\n\n"
    + ((stack1 = (helpers.deadlineNotPassed || (depth0 && depth0.deadlineNotPassed) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1.deadline : stack1),{"name":"deadlineNotPassed","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n<td>"
    + alias4(alias3(((stack1 = ((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1.employer : stack1)) != null ? stack1.company : stack1), depth0))
    + "</td>\n<td>"
    + alias4(alias3(((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1.title : stack1), depth0))
    + "</td>\n<td>"
    + alias4((helpers.formatDate || (depth0 && depth0.formatDate) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1.deadline : stack1),{"name":"formatDate","hash":{},"data":data}))
    + "</td>\n\n"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.submitTime : depth0),undefined,{"name":"equal","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "\n<td>"
    + alias4((helpers.interpretState || (depth0 && depth0.interpretState) || alias2).call(alias1,(depth0 != null ? depth0.state : depth0),{"name":"interpretState","hash":{},"data":data}))
    + "</td>\n\n</tr>\n";
},"useData":true});
templates['s_listing'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!-- author: Jennifer Wu -->\n\n<div class=\"error\" id = \"s-listing-error\"></div>\n\n<label>Company: </label> "
    + alias4(((helper = (helper = helpers.company || (depth0 != null ? depth0.company : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"company","hash":{},"data":data}) : helper)))
    + "\n<br>\n<label>Position Title: </label> "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n<br>\n<label>Deadline:</label> "
    + alias4((helpers.formatDate || (depth0 && depth0.formatDate) || alias2).call(alias1,(depth0 != null ? depth0.deadline : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "\n<br>\n<br>\n\n<div class=\"panel-group\" id=\"full-app-accordion\">\n	<div class=\"panel panel-default\">\n		<div class=\"panel-heading\">\n			<h4 class=\"panel-title\">\n				<a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#full-app-accordion\" href=\"#description-panel\">\n					Description\n				</a>\n			</h4>\n		</div>\n		<div id=\"description-panel\" class=\"panel-collapse collapse\">\n			<div class=\"panel-body\">\n				<label>Description:</label>\n				<p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n\n				<br>\n				<label>Requirements:</label>\n				<p>"
    + alias4(((helper = (helper = helpers.requirements || (depth0 != null ? depth0.requirements : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"requirements","hash":{},"data":data}) : helper)))
    + "</p>\n\n				<br>\n				\n			</div>\n		</div>\n	</div>\n	<div class=\"panel panel-default\">\n		<div class=\"panel-heading\">\n			<h4 class=\"panel-title\">\n				<a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#full-app-accordion\" href=\"#template-panel\">\n					Application\n				</a>\n			</h4>\n		</div>\n		<div id=\"template-panel\" class=\"panel-collapse collapse\">\n			<div class=\"panel-body\">\n"
    + ((stack1 = container.invokePartial(partials.application,(depth0 != null ? depth0.application : depth0),{"name":"application","hash":{"isCommon":false,"isSubmitted":true},"data":data,"indent":"\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "			</div>\n		</div>\n	</div>		\n</div>\n\n<form action=\"/process\" method=\"POST\" id=\"add-custom-form\" data-listing-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n	<input type=\"hidden\" name=\"_csrf\" value=\""
    + alias4(((helper = (helper = helpers.csrfToken || (depth0 != null ? depth0.csrfToken : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"csrfToken","hash":{},"data":data}) : helper)))
    + "\">\n\n	<button type=\"submit\" class=\"btn btn-primary\">\n		<span class=\"glyphicon glyphicon-plus\"></span> Add to my list\n	</button>\n</form>\n";
},"usePartial":true,"useData":true});
templates['s_listing_row'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression;

  return "  <tr class=\"unclickable\" data-listing-id="
    + alias1(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_id","hash":{},"data":data}) : helper)))
    + " data-listing-company="
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.employer : depth0)) != null ? stack1.company : stack1), depth0))
    + ">\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression;

  return "  <tr class=\"clickable s-listing\" data-listing-id="
    + alias1(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_id","hash":{},"data":data}) : helper)))
    + " data-listing-company="
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.employer : depth0)) != null ? stack1.company : stack1), depth0))
    + ">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<!-- author: Heeyoon Kim -->\n\n"
    + ((stack1 = (helpers["in"] || (depth0 && depth0["in"]) || alias2).call(alias1,(depth0 != null ? depth0.userListings : depth0),(depth0 != null ? depth0._id : depth0),{"name":"in","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n  <td>"
    + alias3(container.lambda(((stack1 = (depth0 != null ? depth0.employer : depth0)) != null ? stack1.company : stack1), depth0))
    + "</td>\n  <td>"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</td>\n  <td>"
    + alias3((helpers.formatDate || (depth0 && depth0.formatDate) || alias2).call(alias1,(depth0 != null ? depth0.deadline : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</td>\n</tr>\n";
},"useData":true});
templates['s_listings'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.listing,depth0,{"name":"listing","hash":{"userListings":(depths[1] != null ? depths[1].userListings : depths[1])},"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "        <tr>\n          <td>No listings available</td>\n        </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<!-- author: Heeyoon Kim -->\n\n<div class=\"error\" id = \"s-listings-error\"></div>\n\n<div>\n\n  <!-- Listing Modal -->\n  <div class=\"modal fade\" id=\"listingModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" data-listing-id=\""
    + container.escapeExpression(((helper = (helper = helpers.listingId || (depth0 != null ? depth0.listingId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"listingId","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n          <h4 class=\"modal-title\" id=\"listing-modal-header\"></h4>\n        </div>\n        <div class=\"modal-body\" id=\"listing-modal-content\"></div>\n      </div>\n    </div>\n  </div>\n\n  <h2>Current available listings</h2>\n  <p>Click on a listing for more detailed information.</p>\n  <br>\n\n"
    + ((stack1 = container.invokePartial(partials.filter_bar,depth0,{"name":"filter_bar","data":data,"indent":"  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n  <table class=\"table table-hover table-condensed tablesorter\" id=\"s-listing-table\">\n\n    <thead class=\"clickable-headers\">\n      <th>Company</th>\n      <th>Title</th>\n      <th>Deadline</th>\n    </thead>\n\n    <tbody class=\"searchable\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.listings : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(3, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "    </tbody>\n\n  </table>\n</div>\n";
},"usePartial":true,"useData":true,"useDepths":true});
templates['s_signup'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- author: Lynda Tang -->\n\n<div id=\"s-signup\">\n\n  <div class=\"error\" id = \"s-signup-error\"></div>\n\n  <form id=\"s-signup-form\" class=\"form-horizontal\">\n    <div class=\"form-group\">\n      <label class=\"control-label col-xs-4\">Email:</label>\n      <div class=\"col-xs-8\">\n        <input class=\"form-control\" type=\"email\" name=\"email\" required placeholder=\"Email\"/>\n      </div>\n    </div>\n\n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-4\">Password:</label>\n      <div class=\"col-xs-8\">\n        <input class=\"form-control\" type=\"password\" name=\"password\" required placeholder=\"Password\"/>\n      </div>\n    </div>\n\n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-4\">Confirm Password:</label>\n      <div class=\"col-xs-8\">\n        <input class=\"form-control\" type=\"password\" name=\"confirm\" required placeholder=\"Password\"/>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <div class=\"col-xs-offset-4 col-xs-6\">\n        <input class=\"btn btn-primary\" type=\"submit\" />\n      </div>\n    </div> \n\n  </form>\n\n</div>\n";
},"useData":true});
})();