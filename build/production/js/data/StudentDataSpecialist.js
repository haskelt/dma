// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import DataSpecialist from '/dma/js/data/DataSpecialist.js?v=0.8.0-beta';

class StudentDataSpecialist extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();

	this.processingSteps = [
	    this.convertWorkbookToJSON,
	    this.doIdentifierCheck,
	    this.doRequiredFieldsCheck,
	    this.anonymizeData,
	    this.setData
	];
	
    } // constructor
    
    /**************************************************************************/

} // StudentDataSpecialist

export default StudentDataSpecialist;