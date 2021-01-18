{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{ SITE_PATH }}/js/logger.js';
import StudentDataSpecialist from '{{ SITE_PATH }}/js/data/StudentDataSpecialist.js';
import xlsx from '{{SITE_PATH}}/js/xlsx/xlsx.js';

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
	    JSONData[sheet] = xlsx.sheetToJSON(this.curData.Sheets[sheet], {range: 1});
	    console.log(this.curData.Sheets[sheet]);
	}
	this.curData = JSONData;

    } // convertExamToJSON
	
    /**************************************************************************/
	
} // ExamSpecialist

export default ExamSpecialist;
