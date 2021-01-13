{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{SITE_PATH}}/js/logger.js';
import CryptoJS from '{{SITE_PATH}}/js/cryptojs/sha256.js';
import DataSpecialist from '{{SITE_PATH}}/js/data/DataSpecialist.js';

class Roster extends DataSpecialist {

    /**************************************************************************/

    static data = [];
    
    /**************************************************************************/

    constructor () {

	super();

    } // constructor
    
    /**************************************************************************/

    setData (tag, raw_data, requiredFields) {

	logger.postMessage('DEBUG', 'data', 'Setting roster data');

	/* Do a set of validation checks on the data */
	this.doSingleWorksheetCheck(raw_data);
	this.doRowLengthCheck();
	this.doRequiredFieldsCheck(requiredFields);
	this.doUniqueIdentifiersCheck(requiredFields);

	/* Create identifiers based on a cryptographic hash of the required
	   fields, and save a local copy of the original data plus the 
	   identifier */
	for(let row of this.curData){
	    let stringToHash = '';
	    for(let field of requiredFields){
		stringToHash += row[field];
	    }
	    row['anonID'] = CryptoJS.SHA256(stringToHash).toString();
	}
	Roster.data = this.curData;
	
    } // setData
    
    /**************************************************************************/
    
    doRowLengthCheck (data) {
    	/* Check that each row has the same number of fields */

	var lastNumFields = null;
	for(let row of this.curData){
	    if(lastNumFields && Object.keys(row).length != lastNumFields){
		throw Error('Each row in the roster must have the same number of cells. Please fix and then reupload the roster.');
	    }
	    lastNumFields = Object.keys(row).length;
	}

    } // doRowLengthCheck
    
    /**************************************************************************/

    doUniqueIdentifiersCheck (requiredFields) {
	/* For each required identifier field, make sure all the values in
	   the roster are unique */
	
	for(let field of requiredFields){
	    let uniqueValues = new Set(this.curData.map(entry => entry[field]));
	    if(uniqueValues.size != this.curData.length){
		throw Error('The ' + field + ' column in the roster has one or more duplicate entries. Please fix and then reupload the roster.');
	    }
	}
	
    } // doUniqueIdentifiersCheck
    
    /**************************************************************************/

    static getAnonID (identifierType, identifierValue) {

	var matchIndex = this.data.findIndex(element => element[identifierType] == identifierValue);
	if(matchIndex == -1){
	    throw Error('No student with ' + identifierType + ' of ' + identifierValue + ' is in the roster');
	} else {
	    return this.data[matchIndex].anonID;
	}
	
    } // getAnonID

    /**************************************************************************/

} // Roster

export default Roster;
