{{project.js_copyright_notice}}

import DataSpecialist from '{{project.site_path}}/js/data/DataSpecialist.js?v={{project.version}}';

class WAMAPRosterSpecialist extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();

	this.processingSteps = [
	    this.preprocessWAMAPWorkbook,
	    this.convertWorkbookToJSON,
	    this.doSingleWorksheetCheck,
	    this.doRequiredFieldsCheck,
	    this.doUniqueIdentifiersCheck,
	    this.computeAnonymousIdentifier,
	    this.setData
	];

    } // constructor
    
    /**************************************************************************/

} // WAMAPRosterSpecialist

export default WAMAPRosterSpecialist;
