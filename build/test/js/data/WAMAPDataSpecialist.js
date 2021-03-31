// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import DataSpecialist from '/js/data/DataSpecialist.js?v=0.7.0-beta';

class WAMAPDataSpecialist extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.preprocessWAMAPWorkbook,
	    this.applyHeaderMappings,
	    this.convertWorkbookToJSON,
	    this.doIdentifierCheck,
	    this.doRequiredFieldsCheck,
	    this.applyResponseMappings,
	    this.anonymizeData,
	    this.setData
	];

    } // constructor
    
    /**************************************************************************/

} // WAMAPDataSpecialist

export default WAMAPDataSpecialist;