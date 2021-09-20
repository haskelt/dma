// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import EMARCSDataSpecialist from '/js/emarcs/EMARCSDataSpecialist.js?v=0.21.1-beta';
import DataSpecialistFactory from '/js/data/DataSpecialistFactory.js?v=0.21.1-beta';

class WAMAPDataSpecialist extends EMARCSDataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.preprocessWAMAPAssessment,
	    this.ensureUniqueHeadings,
	    this.applyHeaderMappings,
	    this.standardizeIdentifierHeadings,
	    this.convertWorkbookToJSON,
	    this.formatIdentifierValues,
	    this.doIdentifierCheck,
	    this.doRequiredFieldsCheck,
	    this.applyResponseMappings,
	    this.anonymizeData,
	    this.setData
	];

    } // constructor
    
    /**************************************************************************/

} // WAMAPDataSpecialist

DataSpecialistFactory.register('WAMAPData', WAMAPDataSpecialist);