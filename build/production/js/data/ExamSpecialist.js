// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger.js';
import StudentDataSpecialist from '/dma/js/data/StudentDataSpecialist.js';

class ExamSpecialist extends StudentDataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.possibleIdentifiers = {'name': 'pretty_name', 'sis_id': 'SID', 'id': 'sis_id'};
	this.processingSteps = [
	    this.convertExamToJSON,
	    this.doIdentifierCheck,
	    this.doRequiredFieldsCheck,
	    this.anonymizeData 
	];

    } // constructor
    
    /**************************************************************************/

    convertExamToJSON () {
	
	var JSONData = {};
	for(let sheet in this.curData.Sheets){
	    JSONData[sheet] = XLSX.utils.sheet_to_json(this.curData.Sheets[sheet], {range: 1});
	    console.log(this.curData.Sheets[sheet]);
	}
	this.curData = JSONData;

    } // convertExamToJSON
	
    /**************************************************************************/
	
} // ExamSpecialist

export default ExamSpecialist;