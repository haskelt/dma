{{project.js_copyright_notice}}

import DataSpecialist from '{{project.site_path}}/js/data/DataSpecialist.js?v={{project.version}}';

class StudentDataSpecialist extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();

	this.processingSteps = [
	    this.convertWorkbookToJSON,
	    this.doIdentifierCheck,
	    this.doRequiredFieldsCheck,
	    this.anonymizeData,
	    this.setData
	];
	
    } // constructor
    
    /**************************************************************************/

} // StudentDataSpecialist

export default StudentDataSpecialist;
