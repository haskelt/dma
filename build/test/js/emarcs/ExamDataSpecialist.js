/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import EMARCSDataSpecialist from './EMARCSDataSpecialist.js?v=0.24.1-beta';
import DataSpecialistFactory from '../data/DataSpecialistFactory.js?v=0.24.1-beta';

class ExamDataSpecialist extends EMARCSDataSpecialist {

    /*************************************************************************/

    constructor () {

	super();

	this.processingSteps = [
	    this.preprocessExamWorkbook,
	    this.ensureUniqueHeadings,
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

} // ExamDataSpecialist

DataSpecialistFactory.register('ExamData', ExamDataSpecialist);