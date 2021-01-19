{{ JS_COPYRIGHT_NOTICE }}

import StudentDataSpecialist from '{{ SITE_PATH }}/js/data/StudentDataSpecialist.js';

class ExamSpecialist extends StudentDataSpecialist {

    /**************************************************************************/

    constructor () {

	super();

	this.possibleIdentifiers = {'name': 'pretty_name', 'sis_id': 'SID', 'id': 'sis_id'};
	this.headerRow = 1;

    } // constructor
    
    /**************************************************************************/

} // ExamSpecialist

export default ExamSpecialist;
