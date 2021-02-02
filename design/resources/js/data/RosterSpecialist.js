{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{SITE_PATH}}/js/logger/logger.js?v={{VERSION}}';
import DataError from '{{SITE_PATH}}/js/errors/DataError.js?v={{VERSION}}';
import CryptoJS from '{{SITE_PATH}}/js/cryptojs/sha256.js?v={{VERSION}}';
import DataSpecialist from '{{SITE_PATH}}/js/data/DataSpecialist.js?v={{VERSION}}';
import DataSets from '{{SITE_PATH}}/js/data/DataSets.js?v={{VERSION}}';

class RosterSpecialist extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.convertWorkbookToJSON,
	    this.doSingleWorksheetCheck,
	    this.doRequiredFieldsCheck,
	    this.doUniqueIdentifiersCheck,
	    this.computePrettyNames,
	    this.computePrettySIDs,
	    this.computeIdentifiers,
	    this.setData,
	    this.partitionRoster
	];

    } // constructor
    
    /**************************************************************************/

    doUniqueIdentifiersCheck () {
	/* For each worksheet and required identifier field, make sure
	   all the values in the sheet are unique. */
	
	for(let field of this.config.requiredFields){
	    for(let sheet in this.curData){
		let uniqueValues = new Set(this.curData[sheet].map(entry => entry[field]));
		if(uniqueValues.size != this.curData[sheet].length){
		    throw new DataError('The "' + field + '" column in the sheet "' + sheet + '" has one or more duplicate entries. Please fix and then reupload the file.');
		}
	    }
	}
	
    } // doUniqueIdentifiersCheck
    
    /**************************************************************************/

    computePrettyNames () {
	
	for(let sheet in this.curData){
	    for(let row of this.curData[sheet]){
		let nameFields = row["STUDENT'S NAME"].split(' ');
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

    partitionRoster () {
	
	DataSets.partitionDataSet('_roster', 'course_grade', ['GRADE']);

    } // partitionRoster

    /**************************************************************************/

} // RosterSpecialist

export default RosterSpecialist;
