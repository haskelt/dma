{{project.js_copyright_notice}}

import DataSpecialist from '{{project.site_path}}/js/data/DataSpecialist.js?v={{project.version}}';

class WAMAPDataSpecialist extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.preprocessWAMAPWorkbook,
	    this.applyHeaderMappings,
	    this.convertWorkbookToJSON,
	    this.doIdentifierCheck,
	    this.doRequiredFieldsCheck,
	    this.applyResponseMappings,
	    this.anonymizeData,
	    this.setData
	];

    } // constructor
    
    /**************************************************************************/

} // WAMAPDataSpecialist

export default WAMAPDataSpecialist;
