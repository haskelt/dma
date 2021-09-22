{{globals.js_copyright_notice}}

import EMARCSDataSpecialist from './EMARCSDataSpecialist.js?v={{globals.version}}';
import DataSpecialistFactory from '../data/DataSpecialistFactory.js?v={{globals.version}}';

class WAMAPRosterSpecialist extends EMARCSDataSpecialist {

    /**************************************************************************/

    constructor () {

	super();

	this.processingSteps = [
	    this.preprocessWAMAPWorkbook,
	    this.standardizeIdentifierHeadings,
	    this.convertWorkbookToJSON,
	    this.doSingleWorksheetCheck,
	    this.formatIdentifierValues,
	    this.doRequiredFieldsCheck,
	    this.doUniqueIdentifiersCheck,
	    this.computeAnonymousIdentifier,
	    this.setData
	];

    } // constructor
    
    /**************************************************************************/

} // WAMAPRosterSpecialist

DataSpecialistFactory.register('WAMAPRoster', WAMAPRosterSpecialist);
