// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger/logger.js?v=0.6.1-beta';
import MetadataSpecialist from '/js/data/MetadataSpecialist.js?v=0.6.1-beta';
import RosterSpecialist from '/js/data/RosterSpecialist.js?v=0.6.1-beta';
import WAMAPRosterSpecialist from '/js/data/WAMAPRosterSpecialist.js?v=0.6.1-beta';
import CanvasSpecialist from '/js/data/CanvasSpecialist.js?v=0.6.1-beta';
import CWSpecialist from '/js/data/CWSpecialist.js?v=0.6.1-beta';
import WAMAPSpecialist from '/js/data/WAMAPSpecialist.js?v=0.6.1-beta';
import ExamSpecialist from '/js/data/ExamSpecialist.js?v=0.6.1-beta';

class DataSpecialistFactory {

    static specialists = {
	'Metadata': MetadataSpecialist,
	'Roster': RosterSpecialist,
	'WAMAPRoster': WAMAPRosterSpecialist,
	'Canvas': CanvasSpecialist,
	'CW': CWSpecialist,
	'WAMAP': WAMAPSpecialist,
	'Exam': ExamSpecialist
    };
    
    /**************************************************************************/

    static build (specialistType) {

	return new this.specialists[specialistType]();
	
    } // build

    /**************************************************************************/

} // DataSpecialistFactory

export default DataSpecialistFactory;