{{project.js_copyright_notice}}

import StudentDataSpecialist from '{{project.site_path}}/js/data/StudentDataSpecialist.js?v={{project.version}}';

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
