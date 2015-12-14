/**
 * @author: Jennifer Wu
 */

// add a isStar table sorting function
$.tablesorter.addParser({
    id: 'isStar',
    is: function(s) { return false; },
    format: function(s) {
        return s;
    },
    type: 'numeric'
});


//////////////////////////////////////////////////////////////
// Code logic borrowed from http://stackoverflow.com/questions/1955980/how-to-get-current-sort-order-from-tablesorter-plugin
//////////////////////////////////////////////////////////////
/**
 * Gets the sorting format for the table on the page
 * 
 * @param{String} tablename
 * @return Array of length 2 Arrays that are the sort direction of the table
 *      with the id tablename currently on the page
 */
function SaveSortOrder(tablename) {
    //returns an array of a tablesorter sort order
    var hdrorder = new Array();
    var hdrs = $("#" + tablename + " th");
    var arrayindex = 0;
    hdrs.each(function (index) {
        if ($(this).hasClass('tablesorter-headerAsc')) {
            hdrorder[arrayindex] = [index, 0];
            arrayindex++;
        }
        else if ($(this).hasClass('tablesorter-headerDesc')) {
            hdrorder[arrayindex] = [index, 1];
            arrayindex++;
        }
    });

    return hdrorder;
}