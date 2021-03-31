{{project.js_copyright_notice}}

import DataSpecialist from '{{project.site_path}}/js/data/DataSpecialist.js?v={{project.version}}';

class CanvasRosterSpecialist extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.convertWorkbookToJSON,
	    this.doSingleWorksheetCheck,
	    this.doRequiredFieldsCheck,
	    this.doUniqueIdentifiersCheck,
	    this.computeCanvasPrettyNames,
	    this.computeCanvasPrettySIDs,
	    this.computeIdentifiers,
	    this.setData,
	    this.partitionCanvasRoster
	];

    } // constructor
    
    /**************************************************************************/


} // CanvasRosterSpecialist

export default CanvasRosterSpecialist;
