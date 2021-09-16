{{globals.js_copyright_notice}}

import DataSpecialist from '{{globals.site_path}}/js/data/DataSpecialist.js?v={{globals.version}}';
import DataSpecialistFactory from '{{globals.site_path}}/js/data/DataSpecialistFactory.js?v={{globals.version}}';

class ExamDataSpecialist extends DataSpecialist {

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
