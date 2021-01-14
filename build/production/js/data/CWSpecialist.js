// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger.js';
import StudentDataSpecialist from '/dma/js/data/StudentDataSpecialist.js';

class CWSpecialist extends StudentDataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.possibleIdentifiers = {'id': 'ID', 'name': 'Name', 'E-mail': 'E-mail'};
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
	    JSONData[sheet] = XLSX.utils.sheet_to_json(this.curData.Sheets[sheet], {range: 2});
	    console.log(this.curData.Sheets[sheet]);
	}
	this.curData = JSONData;

    } // convertCWToJSON
	
    /**************************************************************************/
	
} // CWSpecialist

export default CWSpecialist;