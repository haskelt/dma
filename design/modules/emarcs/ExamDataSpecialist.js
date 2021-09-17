{{globals.js_copyright_notice}}

import EMARCSDataSpecialist from '{{globals.site_path}}/js/emarcs/EMARCSDataSpecialist.js?v={{globals.version}}';
import DataSpecialistFactory from '{{globals.site_path}}/js/data/DataSpecialistFactory.js?v={{globals.version}}';

class ExamDataSpecialist extends EMARCSDataSpecialist {

    /*************************************************************************/

    constructor () {

	super();

	this.processingSteps = [
	    this.preprocessExamWorkbook,
	    this.ensureUniqueHeadings,
	    this.standardizeIdentifierHeadings,
	    this.convertWorkbookToJSON,
	    this.formatIdentifierValues,
	    this.doIdentifierCheck,
	    this.doRequiredFieldsCheck,
	    this.applyResponseMappings,
	    this.anonymizeData,
	    this.setData
	];

    } // constructor
    
    /*************************************************************************/

} // ExamDataSpecialist

DataSpecialistFactory.register('ExamData', ExamDataSpecialist);
