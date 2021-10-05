/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import DataSpecialist from '../data/DataSpecialist.js?v=0.24.1-beta';
import DataSpecialistFactory from '../data/DataSpecialistFactory.js?v=0.24.1-beta';

class CanvasDataSpecialist extends DataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
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

} // CanvasDataSpecialist

DataSpecialistFactory.register('CanvasData', CanvasDataSpecialist);