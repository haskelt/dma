// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import DataSpecialist from '/dma/js/data/DataSpecialist.js?v=0.13.1-beta';

class WAMAPRosterSpecialist extends DataSpecialist {

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

export default WAMAPRosterSpecialist;