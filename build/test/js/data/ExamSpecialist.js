// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import StudentDataSpecialist from '/js/data/StudentDataSpecialist.js?v=0.4.0-beta';

class ExamSpecialist extends StudentDataSpecialist {

    /**************************************************************************/

    constructor () {

	super();

	this.possibleIdentifiers = {'sis_id': 'pretty_sid', 'name': 'pretty_name', 'id': null};
	this.headerRow = 1;

    } // constructor
    
    /**************************************************************************/

} // ExamSpecialist

export default ExamSpecialist;