// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger.js';
import DataWarning from '/dma/js/errors/DataWarning.js';
import DataSpecialist from '/dma/js/data/DataSpecialist.js';
import DataSets from '/dma/js/data/DataSets.js';

class StudentDataSpecialist extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();

	this.processingSteps = [
	    this.convertWorkbookToJSON,
	    this.doIdentifierCheck,
	    this.doRequiredFieldsCheck,
	    this.anonymizeData 
	];
	
    } // constructor
    
    /**************************************************************************/

    doIdentifierCheck () {
	/* Check that the data has a field for a recognized student
	   identifier */

	this.identifiers = {};
	for(let sheet in this.curData){
	    var matches = [];
	    for(let identifier of Object.keys(this.possibleIdentifiers)){
		if(identifier in this.curData[sheet][0]){
		    matches.push(identifier);
		}
	    }
	    if(matches.length == 0){
		throw new DataError('Sheet "' + sheet + '" does not have any columns with valid student identifiers. Please fix and reupload.');
	    } else {
		this.identifiers[sheet] = matches;
	    }
	}

    } // doIdentifierCheck

    /**************************************************************************/

    anonymizeData () {
    	/* We use the first identifier that was found in the data file
	   to look up student anonymous IDs. We then add that to each
	   row, while simultaneously removing any other identifiers. */

	for(let sheet in this.curData){
	    let newData = [];
	    let rosterIDType = this.possibleIdentifiers[this.identifiers[sheet][0]];
	    for(let row of this.curData[sheet]){
		try {
		    let anonID = DataSets.findData('_roster', rosterIDType, row[this.identifiers[sheet][0]], 'anonID');

		    let newRow = { 'anonID': anonID };
		    for(let field in row){
			if(!(this.identifiers[sheet].includes(field))){
			    newRow[field] = row[field];
			}
		    }
		    newData.push(newRow);
		}
		catch (error) {
		    if (error instanceof DataWarning) {
			alert('Unable to find student with ' + this.identifiers[sheet][0] + ' "' + row[this.identifiers[sheet][0]] + '" in the roster, skipping');
			logger.postMessage('ERROR', 'data', error.message);
		    } else {
			throw error;
		    }
		}
	    }
	    this.curData[sheet] = newData;
	}

    } // anonymizeData

    /**************************************************************************/
    
} // StudentDataSpecialist

export default StudentDataSpecialist;