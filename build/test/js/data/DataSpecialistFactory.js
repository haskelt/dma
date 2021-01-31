// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js?v=0.1.2-beta';
import MetadataSpecialist from '/js/data/MetadataSpecialist.js?v=0.1.2-beta';
import RosterSpecialist from '/js/data/RosterSpecialist.js?v=0.1.2-beta';
import CanvasSpecialist from '/js/data/CanvasSpecialist.js?v=0.1.2-beta';
import CWSpecialist from '/js/data/CWSpecialist.js?v=0.1.2-beta';
import ExamSpecialist from '/js/data/ExamSpecialist.js?v=0.1.2-beta';

class DataSpecialistFactory {

    static specialists = {
	'Metadata': MetadataSpecialist,
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