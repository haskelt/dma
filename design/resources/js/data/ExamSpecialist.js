{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{ SITE_PATH }}/js/logger.js';
import StudentDataSpecialist from '{{ SITE_PATH }}/js/data/StudentDataSpecialist.js';

class ExamSpecialist extends StudentDataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.possibleIdentifiers = {'id': 'ID', 'name': 'Name', 'E-mail': 'E-mail'};
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
