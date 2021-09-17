// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import EMARCSDataSpecialist from '/dma/js/emarcs/EMARCSDataSpecialist.js?v=0.19.1-beta';
import DataSpecialistFactory from '/dma/js/data/DataSpecialistFactory.js?v=0.19.1-beta';

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