// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import EMARCSDataSpecialist from './EMARCSDataSpecialist.js?v=0.22.1-beta';
import DataSpecialistFactory from '../data/DataSpecialistFactory.js?v=0.22.1-beta';

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