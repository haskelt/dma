{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{SITE_PATH}}/js/logger.js';
import CryptoJS from '{{SITE_PATH}}/js/cryptojs/sha256.js';
import DataSpecialist from '{{SITE_PATH}}/js/data/DataSpecialist.js';

class RosterSpecialist extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.convertWorkbookToJSON,
	    this.doSingleWorksheetCheck,
	    this.doRowLengthCheck,
	    this.doRequiredFieldsCheck,
	    this.doUniqueIdentifiersCheck,
	    this.computePrettyNames,
	    this.computePrettySIDs,
	    this.computeIdentifiers
	];

    } // constructor
    
    /**************************************************************************/
    
    doRowLengthCheck () {
    	/* For each worksheet, check that each row has the same number
	 * of fields */

	for(let sheet in this.curData){
	    for(let row of this.curData[sheet]){
		var lastNumFields = null;
		if(lastNumFields && Object.keys(row).length != lastNumFields){
		    throw Error('Each row in the file must have the same number of cells. Please fix and then reupload the file.');
		}
		lastNumFields = Object.keys(row).length;
	    }
	}

    } // doRowLengthCheck
    
    /**************************************************************************/

    doUniqueIdentifiersCheck () {
	/* For each worksheet and required identifier field, make sure
	   all the values in the sheet are unique. */
	
	for(let field of this.config.requiredFields){
	    for(let sheet in this.curData){
		let uniqueValues = new Set(this.curData[sheet].map(entry => entry[field]));
		if(uniqueValues.size != this.curData[sheet].length){
		    throw Error('The ' + field + ' column in the sheet ' + sheet + ' has one or more duplicate entries. Please fix and then reupload the file.');
		}
	    }
	}
	
    } // doUniqueIdentifiersCheck
    
    /**************************************************************************/

    computePrettyNames () {
	
	for(let sheet in this.curData){
	    for(let row of this.curData[sheet]){
		let nameFields = row["Student's Name"].split(' ');
		row['pretty_name'] = nameFields[1] + ' ' + nameFields[0];
	    }
	}
	
    } // computePrettyNames
    
    /**************************************************************************/

    computePrettySIDs () {
	
	for(let sheet in this.curData){
	    for(let row of this.curData[sheet]){
		let sidFields = row['SID'].split('-');
		row['pretty_sid'] = sidFields[0] + sidFields[1] + sidFields[2];
	    }
	}
	
    } // computePrettySIDs
    
    /**************************************************************************/

    
    computeIdentifiers () {
	/* Create identifiers based on a cryptographic hash of the required
	   fields, and add them to the data */

	for(let sheet in this.curData){
	    for(let row of this.curData[sheet]){
		let stringToHash = '';
		for(let field of this.config.requiredFields){
		    stringToHash += row[field];
		}
		row['anonID'] = CryptoJS.SHA256(stringToHash).toString();
	    }
	}

    } // computeIdentifiers

    /**************************************************************************/

} // RosterSpecialist

export default RosterSpecialist;
