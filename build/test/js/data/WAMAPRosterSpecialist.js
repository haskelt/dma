// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import DataSpecialist from '/js/data/DataSpecialist.js?v=0.7.0-beta';

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
	    this.computeIdentifiers,
	    this.setData
	];

    } // constructor
    
    /**************************************************************************/

} // WAMAPRosterSpecialist

export default WAMAPRosterSpecialist;