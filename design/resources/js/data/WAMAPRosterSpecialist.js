{{project.js_copyright_notice}}

import logger from '{{project.site_path}}/js/logger/logger.js?v={{project.version}}';
import DataError from '{{project.site_path}}/js/errors/DataError.js?v={{project.version}}';
import CryptoJS from '{{project.site_path}}/js/cryptojs/sha256.js?v={{project.version}}';
import DataSpecialist from '{{project.site_path}}/js/data/DataSpecialist.js?v={{project.version}}';
import DataSets from '{{project.site_path}}/js/data/DataSets.js?v={{project.version}}';

class WAMAPRosterSpecialist extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.convertWorkbookToJSON,
	    this.doSingleWorksheetCheck,
	    this.doRequiredFieldsCheck,
	    this.doUniqueIdentifiersCheck,
	    this.computeIdentifiers,
	    this.setData
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

} // WAMAPRosterSpecialist

export default WAMAPRosterSpecialist;
