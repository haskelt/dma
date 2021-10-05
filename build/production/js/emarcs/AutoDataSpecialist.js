/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import EMARCSDataSpecialist from './EMARCSDataSpecialist.js?v=0.25.0-beta';
import DataSpecialistFactory from '../data/DataSpecialistFactory.js?v=0.25.0-beta';

class AutoDataSpecialist extends EMARCSDataSpecialist {

    /*************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.autoPreprocessWorkbook,
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

} // AutoDataSpecialist

DataSpecialistFactory.register('AutoData', AutoDataSpecialist);