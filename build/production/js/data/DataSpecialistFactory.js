// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger.js';
import RosterSpecialist from '/dma/js/data/RosterSpecialist.js';
import CanvasSpecialist from '/dma/js/data/CanvasSpecialist.js';
import CWSpecialist from '/dma/js/data/CWSpecialist.js';
import ExamSpecialist from '/dma/js/data/ExamSpecialist.js';

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