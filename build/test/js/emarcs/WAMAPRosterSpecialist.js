// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import EMARCSDataSpecialist from '/js/emarcs/EMARCSDataSpecialist.js?v=0.18.1-beta';
import DataSpecialistFactory from '/js/data/DataSpecialistFactory.js?v=0.18.1-beta';

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