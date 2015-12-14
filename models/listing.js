/**
 * This is the schema for the database that stores all the job listings 
 * on our site. Each listing includes the employer, the title of the listing
 * (usually the position name), description of the internship, requirements 
 * to apply to the job, and the deadline.
 *
 * Listings are created by Employers and can be viewed by Students. 
 *
 * Rep invariant: A listing has an existent owner/employer, a title,
 * 				  and a deadline
 *
 * @author Maddie Dawson and Heeyoon Kim
 */
var mongoose = require("mongoose");

//Schema for listings
var listingSchema = mongoose.Schema({
	employer: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Employer", 
		required: true,
		immutable: true
	}, 
	title: {
		type: String, 
		required: true, 
		immutable: true
	},
	description: {
		type: String, 
		immutable: true
	},
	requirements: {
		type: String, 
		immutable: true
	},
	deadline: {
		type: Date, 
		required: true, 
		immutable: true
	}
});


/**
 * Creates a new Listing, then calls callback function
 *
 * @param{String} employerId the id of the employer who creates the listing
 * @param{String} title the title of the internship position
 * @param{String} desc of the internship position
 * @param{String} reqs the requirements that the employer wants you to have, e.g. Graduates on June 2017, B.S. Computer Science, etc.
 * @param{Date} deadline the date at which the application for this listing will close
 * @param{Function} callback(err, listing) 
 */
listingSchema.statics.createListing = function(employerId, title, desc, reqs, deadline, callback) {
	Listing.create({
		employer: employerId,
		title: title,
		description: desc,
		requirements: reqs,
		deadline: new Date(deadline)
	}, function(err, listing) {
	      if (err) {
	        callback(err.message);
	      } else {
	        callback(null, listing);
	      }
    });
};

/**
 * Deletes the listing with id listingId, then calls callback function
 *
 * @param{String} listingId the id of the listing to delete
 * @param{Function} callback(err, listing) 
 */
listingSchema.statics.deleteListing = function(listingId, callback) {
	Listing.remove({_id: listingId}, function(err) {
      if (err) {
        callback(err.message);
      } else {
        callback(null);
      }
    });
};

/**
 * Retrieve all listings whose deadlines haven't passed yet and pass 
 * them to the provided callback.
 *
 * @param{Function} callback: a function to pass the listing info to. The
 *					callback takes in an error and the list of listings
 */
listingSchema.statics.getAllCurrentListings = function(callback) {
	getListings({deadline: {$gte : new Date()}}, callback);
};

/**
 * Retrieve all listings posted by the employer with given ID and
 * pass them to the provided callback.
 *
 * @param{ObjectId} employerId: the ID of the employer whose listings to retrieve
 * @param{Function} callback: a function to pass the listing info to. The
 * 					callback takes in an error and the list of listings
 */
listingSchema.statics.getAllEmployerListings = function(employerId, callback) {
	getListings({employer: employerId}, callback);
};

/**
 * Retrieve all information for the listing with ID listingId and pass it
 * to the provided callback.
 *
 * @param{ObjectId} listingId:
 * @param{Function} callback: a funciton to pass the listing to. The callback takes
 * 					in an error and the listing
 */
listingSchema.statics.getByListingId = function(listingId, callback) {
	Listing.findOne({ _id: listingId }, function(err, listing) {
		if (err) {
			callback(err.message);
		} else if (!listing) {
			callback('Listing does not exist.');
		} else {
			callback(null, listing);
		}
	});
};

/**
 * Checks if the employer associated with the employerId owns the listing
 * associated wtih the listingId
 * 
 * @param{ObjectId} employerId
 * @param{ObjectId} listingId
 * @param{Function} callback : a function to pass a Boolean into that is true
 * 					if there is a listing with employer as employerId and the id listingId,
 *					and false otherwise
 */
listingSchema.statics.doesEmployerOwnListing = function(employerId, listingId, callback) {
	Listing.find({ _id : listingId, employer : employerId }, function(err, listings) {
		if (err) {
			callback(err.message, false);
		} else if (listings.length !== 1) {
			callback(null, false);
		} else {
			callback(null, true);
		}
	});
};

/**
 * Retrieve listings that match the given query and pass them to
 * the provided callback.
 *
 * @param{Object} query: a JSON object that represents a MongoDB query
 * @param{Function} callback: a function to pass the listing info to. The
 * 					callback takes in an error and the list of listings
 */
var getListings = function(query, callback) {
	Listing.find(query).populate("employer").exec(function(err, listing_data) {
		if (err) {
			callback(err.message);
		} else {
			callback(null, listing_data);
		}
	});
};

var Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;