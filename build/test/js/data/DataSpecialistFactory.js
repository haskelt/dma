// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger/logger.js?v=0.10.1-beta';
import MetadataSpecialist from '/js/data/MetadataSpecialist.js?v=0.10.1-beta';
import CanvasRosterSpecialist from '/js/data/CanvasRosterSpecialist.js?v=0.10.1-beta';
import WAMAPRosterSpecialist from '/js/data/WAMAPRosterSpecialist.js?v=0.10.1-beta';
import CanvasDataSpecialist from '/js/data/CanvasDataSpecialist.js?v=0.10.1-beta';
import CWDataSpecialist from '/js/data/CWDataSpecialist.js?v=0.10.1-beta';
import WAMAPDataSpecialist from '/js/data/WAMAPDataSpecialist.js?v=0.10.1-beta';
import ExamDataSpecialist from '/js/data/ExamDataSpecialist.js?v=0.10.1-beta';
import PSVTDataSpecialist from '/js/data/PSVTDataSpecialist.js?v=0.10.1-beta';

class DataSpecialistFactory {

    static specialists = {
	'Metadata': MetadataSpecialist,
	'CanvasRoster': CanvasRosterSpecialist,
	'WAMAPRoster': WAMAPRosterSpecialist,
	'CanvasData': CanvasDataSpecialist,
	'CWData': CWDataSpecialist,
	'WAMAPData': WAMAPDataSpecialist,
	'ExamData': ExamDataSpecialist,
	'PSVTData': PSVTDataSpecialist
    };
    
    /**************************************************************************/

    static build (specialistType) {

	return new this.specialists[specialistType]();
	
    } // build

    /**************************************************************************/

} // DataSpecialistFactory

export default DataSpecialistFactory;