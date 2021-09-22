{{globals.js_copyright_notice}}

import EMARCSDataSpecialist from './EMARCSDataSpecialist.js?v={{globals.version}}';
import DataSpecialistFactory from '../data/DataSpecialistFactory.js?v={{globals.version}}';

class AutoDataSpecialist extends EMARCSDataSpecialist {

    /*************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.autoPreprocessWorkbook,
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
    
    /*************************************************************************/

} // AutoDataSpecialist

DataSpecialistFactory.register('AutoData', AutoDataSpecialist);
