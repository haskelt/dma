// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import EMARCSDataSpecialist from './EMARCSDataSpecialist.js?v=0.21.3-beta';
import DataSpecialistFactory from '../data/DataSpecialistFactory.js?v=0.21.3-beta';

class CanvasRosterSpecialist extends EMARCSDataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.standardizeIdentifierHeadings,
	    this.convertWorkbookToJSON,
	    this.doSingleWorksheetCheck,
	    this.formatIdentifierValues,
	    this.doRequiredFieldsCheck,
	    this.doUniqueIdentifiersCheck,
	    this.computeAnonymousIdentifier,
	    this.setData,
	    this.partitionCanvasRoster
	];

    } // constructor
    
    /**************************************************************************/


} // CanvasRosterSpecialist

DataSpecialistFactory.register('CanvasRoster', CanvasRosterSpecialist);