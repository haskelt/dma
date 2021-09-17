{{globals.js_copyright_notice}}

import EMARCSDataSpecialist from '{{globals.site_path}}/js/emarcs/EMARCSDataSpecialist.js?v={{globals.version}}';
import DataSpecialistFactory from '{{globals.site_path}}/js/data/DataSpecialistFactory.js?v={{globals.version}}';

class PSVTDataSpecialist extends EMARCSDataSpecialist {

    /*************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.preprocessWAMAPGradebook,
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

} // PSVTDataSpecialist

DataSpecialistFactory.register('PSVTData', PSVTDataSpecialist);
