// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';
import RosterSpecialist from '/js/data/RosterSpecialist.js';
import CanvasSpecialist from '/js/data/CanvasSpecialist.js';
import CWSpecialist from '/js/data/CWSpecialist.js';
import ExamSpecialist from '/js/data/ExamSpecialist.js';

class DataSpecialistFactory {

    static specialists = {
	'Roster': RosterSpecialist,
	'Canvas': CanvasSpecialist,
	'CW': CWSpecialist,
	'Exam': ExamSpecialist
    };
    
    /**************************************************************************/

    static build (specialistType) {

	return new this.specialists[specialistType]();
	
    } // build

    /**************************************************************************/

} // DataSpecialistFactory

export default DataSpecialistFactory;