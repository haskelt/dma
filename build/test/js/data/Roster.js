// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';
import CryptoJS from '/js/cryptojs/sha256.js';

class Roster {

    static requiredIdentifiers = ['Name', 'ID', 'E-mail'];
    static data = [];
    
    /**************************************************************************/

    static setData (tag, raw_data) {

	logger.postMessage('DEBUG', 'data', 'Setting roster data');

	/* Do a set of validation checks on the data */
	this.doSingleWorksheetCheck(raw_data);
	var data = raw_data[Object.keys(raw_data)[0]]
	this.doRowLengthCheck(data);
	this.doRequiredIdentifiersCheck(data);
	this.doUniqueIdentifiersCheck(data);

	/* Create identifiers based on a cryptographic hash of the required
	   fields, and save a local copy of the original data plus the 
	   identifier */
	for(let row of data){
	    let stringToHash = '';
	    for(let field of this.requiredIdentifiers){
		stringToHash += row[field];
	    }
	    let anonID = CryptoJS.SHA256(stringToHash).toString();
	    this.data.push(Object.assign({ 'anonID': anonID }, row));
	}
	
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
    
    static doRowLengthCheck (data) {
    	/* Check that each row has the same number of fields */

	var lastNumFields = null;
	for(let row of data){
	    if(lastNumFields && Object.keys(row).length != lastNumFields){
		throw Error('Each row in the roster must have the same number of cells. Please fix and then reupload the roster.');
	    }
	    lastNumFields = Object.keys(row).length;
	}

    } // doRowLengthCheck
    
    /**************************************************************************/

    static doRequiredIdentifiersCheck (data) {
	/* Check that the required identifiers are present as fields in the 
	   data. Extra fields are okay. */

	for(let field of this.requiredIdentifiers){
	    if(!(field in data[0])){
		throw Error('Roster must have a column for ' + field + '. Please fix and then reupload the roster.');
	    }
	}
	    
    } // doRequiredFieldsCheck

    /**************************************************************************/

    static doUniqueIdentifiersCheck (data) {
	/* For each required identifier field, make sure all the values in
	   the roster are unique */
	
	for(let field of this.requiredIdentifiers){
	    let uniqueValues = new Set(data.map(entry => entry[field]));
	    if(uniqueValues.size != data.length){
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