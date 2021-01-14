// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';
import StudentDataSpecialist from '/js/data/StudentDataSpecialist.js';

class CanvasSpecialist extends StudentDataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.possibleIdentifiers = {'id': 'ID', 'name': 'Name'};
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
	
	var JSONData = {};
	for(let sheet in this.curData.Sheets){
	    JSONData[sheet] = XLSX.utils.sheet_to_json(this.curData.Sheets[sheet]);
	}
	this.curData = JSONData;

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