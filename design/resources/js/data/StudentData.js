{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{ SITE_PATH }}/js/logger.js';
import Roster from '{{ SITE_PATH }}/js/data/Roster.js';

class StudentData {

    static possibleIdentifiers = {'name': 'Name', 'id': 'ID'};
    static data = {};
    
    /**************************************************************************/

    static setData (tag, raw_data) {

	logger.postMessage('DEBUG', 'data', 'Setting student data ' + tag);

	/* Do a set of validation checks on the data */
	this.doSingleWorksheetCheck(raw_data);
	var data = raw_data[Object.keys(raw_data)[0]]
	var identifiers = this.doIdentifierCheck(data);
	    
	/* Store the data */
	var temp = {};
	/* We use the first identifier that was found in the data file
	   to look up student anonymous IDs */
	var rosterIDType = this.possibleIdentifiers[identifiers[0]];
	for(let row of data){
	    let anonID = Roster.getAnonID(rosterIDType, row[identifiers[0]]);
	    temp[anonID] = row; 
	}
	data[tag] = temp;
	
    } // setData
    
    /**************************************************************************/

    static doSingleWorksheetCheck (raw_data) {
	/* Check that there's only one worksheet. With multiple worksheets,
	   we don't know which one we're supposed to be looking at. */

	if(Object.keys(raw_data).length != 1){
	    throw Error('Roster can only have one worksheet. Please fix and then reupload the roster.');
	}

    } // doSingleWorksheetCheck

    /**************************************************************************/

    static doIdentifierCheck (data) {
	/* Check that the data has a field for a recognized student
	   identifier */

	var matches = [];
	for(let identifier of Object.keys(this.possibleIdentifiers)){
	    if(identifier in data[0]){
		matches.push(identifier);
	    }
	}
	if(matches.length == 0){
	    throw Error('Data file does not have any columns with valid student identifiers. Please fix and reupload.');
	} else {
	    return matches;
	}

    } // doIdentifierCheck

    /**************************************************************************/

    static getData (tag, anonID) {

	return this.data[tag][anonID];
	
    } // getData

    /**************************************************************************/

} // StudentData

export default StudentData;
