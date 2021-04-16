// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import DataSpecialist from '/js/data/DataSpecialist.js?v=0.10.1-beta';

class CWDataSpecialist extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.possibleIdentifiers = {'E-mail': 'EMAIL'};
	this.processingSteps = [
	    this.preprocessCWWorkbook,
	    this.convertWorkbookToJSON,
	    this.doIdentifierCheck,
	    this.doRequiredFieldsCheck,
	    this.applyResponseMappings,
	    this.anonymizeData,
	    this.setData
	];

    } // constructor
    
    /**************************************************************************/
    
} // CWDataSpecialist

export default CWDataSpecialist;