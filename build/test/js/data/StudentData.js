// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';
import xlsxUtilities from '/js/files/xlsxUtilities.js';
import DataSpecialist from '/js/data/DataSpecialist.js';
import DataSets from '/js/data/DataSets.js';

class StudentData extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.possibleIdentifiers = {'name': 'Name', 'id': 'ID'};

    } // constructor
    
    /**************************************************************************/

    setData (tag, data, requiredFields) {

	logger.postMessage('DEBUG', 'data', 'Setting student data ' + tag);

	this.curData = data;
	this.requiredFields = requiredFields;
	
	this.convertWorkbookToJSON();
	this.useFirstWorksheet();
	this.trimLongHeadings();
	this.doIdentifierCheck();
	this.doRequiredFieldsCheck();
	this.anonymizeData();
	    
	DataSets.setDataSet(tag, this.curData);
	
    } // setData
    
    /**************************************************************************/

    trimLongHeadings () {
	/* Take fields with lengthy multi-word names, and replace them with just
	   the first word */

	/* Identify the field names to change, and determine the appropriate
	   replacement values */
	var replacements = [];
	for(let field in this.curData[0]){
	    // THESE CRITERIA ARE A HACK
	    if(field.length > 12 && field.includes(' ')){
		let newField = field.split(' ')[0];
		logger.postMessage('DEBUG', 'data', 'replacing ' + field + ' with ' + newField);
		replacements.push({'oldField': field, 'newField': newField});
	    }
	}

	/* Do the replacements */
	for(let row of this.curData){
	    for(let replacement of replacements){
		row[replacement.newField] = row[replacement.oldField];
		delete row[replacement.oldField];
	    }
	}
	
    } // trimLongHeadings

    /**************************************************************************/

    doIdentifierCheck () {
	/* Check that the data has a field for a recognized student
	   identifier */

	var matches = [];
	for(let identifier of Object.keys(this.possibleIdentifiers)){
	    if(identifier in this.curData[0]){
		matches.push(identifier);
	    }
	}
	if(matches.length == 0){
	    throw Error('Data file does not have any columns with valid student identifiers. Please fix and reupload.');
	} else {
	    this.identifiers = matches;
	}

    } // doIdentifierCheck

    /**************************************************************************/

    anonymizeData () {
    	/* We use the first identifier that was found in the data file
	   to look up student anonymous IDs. We then add that to each
	   row, while simultaneously removing any other identifiers. */
	var newData = [];
	var rosterIDType = this.possibleIdentifiers[this.identifiers[0]];
	for(let row of this.curData){
	    try {
		let anonID = DataSets.findData('_roster', rosterIDType, row[this.identifiers[0]], 'anonID');
		let newRow = { 'anonID': anonID };
		for(let field in row){
		    if(!(this.identifiers.includes(field))){
			newRow[field] = row[field];
		    }
		}
		newData.push(newRow);
	    }
	    catch (error) {
		console.log(error);
		alert('Unable to find student ' + row[this.identifiers[0]] + ' in the roster, skipping.');
	    }
	}
	this.curData = newData;

    } // anonymizeData

    /**************************************************************************/
    
} // StudentData

export default StudentData;