{{project.js_copyright_notice}}

import DataSpecialist from '{{project.site_path}}/js/data/DataSpecialist.js?v={{project.version}}';

class PSVTDataSpecialist extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.preprocessPSVTWorkbook,
	    this.applyHeaderMappings,
	    this.convertWorkbookToJSON,
	    this.doIdentifierCheck,
	    this.doRequiredFieldsCheck,
	    this.anonymizeData,
	    this.setData
	];

    } // constructor
    
    /**************************************************************************/

} // PSVTDataSpecialist

export default PSVTDataSpecialist;
