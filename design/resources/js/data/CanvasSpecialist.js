{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{SITE_PATH}}/js/logger.js';
import StudentDataSpecialist from '{{SITE_PATH}}/js/data/StudentDataSpecialist.js';

class CanvasSpecialist extends StudentDataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	/* Canvas ID isn't in the roster but we want to scrub it from the
	   data anyway. By listing it as the last possible identifier,
	   it should never be used to look a student up, but will still
	   get removed when the data is anonymized. */
	this.possibleIdentifiers = {'sis_id': 'pretty_sid', 'name': 'pretty_name', 'id': 'SID'};
	this.processingSteps = [
	    this.convertCanvasToJSON,
	    this.doSingleWorksheetCheck,
	    this.doIdentifierCheck,
	    this.doRequiredFieldsCheck,
	    this.anonymizeData 
	];

    } // constructor
    
    /**************************************************************************/

    convertCanvasToJSON () {

	this.convertWorkbookToJSON();

	/* Take fields with lengthy multi-word names, and replace them with just
	       the first word */
	for(let sheet in this.curData){
	    /* Identify the field names to change, and determine the appropriate
	       replacement values */
	    var replacements = [];
	    for(let field in this.curData[sheet][0]){
		// THESE CRITERIA ARE A HACK
		if(field.length > 12 && field.includes(' ')){
		    let newField = field.split(' ')[0];
		    logger.postMessage('DEBUG', 'data', 'replacing ' + field + ' with ' + newField);
		    replacements.push({'oldField': field, 'newField': newField});
		}
	    }
	    
	    /* Do the replacements */
	    for(let row of this.curData[sheet]){
		for(let replacement of replacements){
		    row[replacement.newField] = row[replacement.oldField];
		    delete row[replacement.oldField];
		}
	    }
	}
	
    } // convertCanvasToJSON

    /**************************************************************************/

} // CanvasSpecialist

export default CanvasSpecialist;
