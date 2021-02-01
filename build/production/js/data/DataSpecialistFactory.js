// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger/logger.js?v=0.3.0-beta';
import MetadataSpecialist from '/dma/js/data/MetadataSpecialist.js?v=0.3.0-beta';
import RosterSpecialist from '/dma/js/data/RosterSpecialist.js?v=0.3.0-beta';
import CanvasSpecialist from '/dma/js/data/CanvasSpecialist.js?v=0.3.0-beta';
import CWSpecialist from '/dma/js/data/CWSpecialist.js?v=0.3.0-beta';
import ExamSpecialist from '/dma/js/data/ExamSpecialist.js?v=0.3.0-beta';

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