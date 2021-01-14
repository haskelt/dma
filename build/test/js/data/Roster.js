// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';
import CryptoJS from '/js/cryptojs/sha256.js';
import DataSpecialist from '/js/data/DataSpecialist.js';
import DataSets from '/js/data/DataSets.js';

class Roster extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();

    } // constructor
    
    /**************************************************************************/

    setData (tag, data, requiredFields) {

	logger.postMessage('DEBUG', 'data', 'Setting roster data');

	this.curData = data;
	this.requiredFields = requiredFields;
	
	this.doSingleWorksheetCheck();
	this.doRowLengthCheck();
	this.doRequiredFieldsCheck();
	this.doUniqueIdentifiersCheck();
	this.computeIdentifiers();

	DataSets.setDataSet(tag, this.curData);
	
    } // setData
    
    /**************************************************************************/
    
    doRowLengthCheck () {
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

    doUniqueIdentifiersCheck () {
	/* For each required identifier field, make sure all the values in
	   the roster are unique */
	
	for(let field of this.requiredFields){
	    let uniqueValues = new Set(this.curData.map(entry => entry[field]));
	    if(uniqueValues.size != this.curData.length){
		throw Error('The ' + field + ' column in the roster has one or more duplicate entries. Please fix and then reupload the roster.');
	    }
	}
	
    } // doUniqueIdentifiersCheck
    
    /**************************************************************************/

    computeIdentifiers () {
	/* Create identifiers based on a cryptographic hash of the required
	   fields, and add them to the data */

	for(let row of this.curData){
	    let stringToHash = '';
	    for(let field of this.requiredFields){
		stringToHash += row[field];
	    }
	    row['anonID'] = CryptoJS.SHA256(stringToHash).toString();
	}

    } // computeIdentifiers

    /**************************************************************************/

} // Roster

export default Roster;