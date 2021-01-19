// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import StudentDataSpecialist from '/js/data/StudentDataSpecialist.js';

class ExamSpecialist extends StudentDataSpecialist {

    /**************************************************************************/

    constructor () {

	super();

	this.possibleIdentifiers = {'name': 'pretty_name', 'sis_id': 'SID', 'id': 'sis_id'};
	this.headerRow = 1;

    } // constructor
    
    /**************************************************************************/

} // ExamSpecialist

export default ExamSpecialist;