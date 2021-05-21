{{globals.js_copyright_notice}}

import DataSpecialist from '{{globals.site_path}}/js/data/DataSpecialist.js?v={{globals.version}}';

class WAMAPDataSpecialist extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.preprocessWAMAPWorkbook,
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

} // WAMAPDataSpecialist

export default WAMAPDataSpecialist;
