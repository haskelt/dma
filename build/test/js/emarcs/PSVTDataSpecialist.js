// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import EMARCSDataSpecialist from '/js/emarcs/EMARCSDataSpecialist.js?v=0.21.3-beta';
import DataSpecialistFactory from '/js/data/DataSpecialistFactory.js?v=0.21.3-beta';

class PSVTDataSpecialist extends EMARCSDataSpecialist {

    /*************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.preprocessWAMAPGradebook,
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
    
    /*************************************************************************/

} // PSVTDataSpecialist

DataSpecialistFactory.register('PSVTData', PSVTDataSpecialist);