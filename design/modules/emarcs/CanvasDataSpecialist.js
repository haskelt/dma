{{globals.js_copyright_notice}}

import DataSpecialist from '../data/DataSpecialist.js?v={{globals.version}}';
import DataSpecialistFactory from '../data/DataSpecialistFactory.js?v={{globals.version}}';

class CanvasDataSpecialist extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.ensureUniqueHeadings,
	    this.applyHeaderMappings,
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
    
    /**************************************************************************/

} // CanvasDataSpecialist

DataSpecialistFactory.register('CanvasData', CanvasDataSpecialist);
