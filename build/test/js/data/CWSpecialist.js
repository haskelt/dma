// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';
import StudentDataSpecialist from '/js/data/StudentDataSpecialist.js';
import xlsx from '/js/xlsx/xlsx.js';

class CWSpecialist extends StudentDataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.possibleIdentifiers = {'E-mail': 'Email'};
	this.processingSteps = [
	    this.convertCWToJSON,
	    this.doIdentifierCheck,
	    this.doRequiredFieldsCheck,
	    this.anonymizeData 
	];

    } // constructor
    
    /**************************************************************************/

    convertCWToJSON () {
	
	var JSONData = {};
	for(let sheet in this.curData.Sheets){
	    this.curData.Sheets[sheet]['B3'].t = 's';
	    this.curData.Sheets[sheet]['B3'].v = 'E-mail';
	    this.curData.Sheets[sheet]['B3'].w = undefined;
	    JSONData[sheet] = xlsx.sheetToJSON(this.curData.Sheets[sheet], {range: 2});
	    console.log(this.curData.Sheets[sheet]);
	}
	this.curData = JSONData;

    } // convertCWToJSON
	
    /**************************************************************************/
	
} // CWSpecialist

export default CWSpecialist;