{{globals.js_copyright_notice}}

import EMARCSDataSpecialist from '{{globals.site_path}}/js/emarcs/EMARCSDataSpecialist.js?v={{globals.version}}';
import DataSpecialistFactory from '{{globals.site_path}}/js/data/DataSpecialistFactory.js?v={{globals.version}}';

class CWDataSpecialist extends EMARCSDataSpecialist {

    /*************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.preprocessCWWorkbook,
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
    
} // CWDataSpecialist

DataSpecialistFactory.register('CWData', CWDataSpecialist);

