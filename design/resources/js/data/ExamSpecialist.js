{{ JS_COPYRIGHT_NOTICE }}

import StudentDataSpecialist from '{{ SITE_PATH }}/js/data/StudentDataSpecialist.js';

class ExamSpecialist extends StudentDataSpecialist {

    /**************************************************************************/

    constructor () {

	super();

	this.possibleIdentifiers = {'sis_id': 'pretty_sid', 'name': 'pretty_name', 'id': null};
	this.headerRow = 1;

    } // constructor
    
    /**************************************************************************/

} // ExamSpecialist

export default ExamSpecialist;
