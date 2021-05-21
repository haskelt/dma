{{globals.js_copyright_notice}}

import DataSpecialist from '{{globals.site_path}}/js/data/DataSpecialist.js?v={{globals.version}}';

class CanvasRosterSpecialist extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.standardizeIdentifierHeadings,
	    this.convertWorkbookToJSON,
	    this.doSingleWorksheetCheck,
	    this.formatIdentifierValues,
	    this.doRequiredFieldsCheck,
	    this.doUniqueIdentifiersCheck,
	    this.computeAnonymousIdentifier,
	    this.setData,
	    this.partitionCanvasRoster
	];

    } // constructor
    
    /**************************************************************************/


} // CanvasRosterSpecialist

export default CanvasRosterSpecialist;
