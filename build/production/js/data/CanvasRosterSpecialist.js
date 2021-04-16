// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import DataSpecialist from '/dma/js/data/DataSpecialist.js?v=0.10.1-beta';

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
	    this.computeAnonymousIdentifier,
	    this.setData,
	    this.partitionCanvasRoster
	];

    } // constructor
    
    /**************************************************************************/


} // CanvasRosterSpecialist

export default CanvasRosterSpecialist;