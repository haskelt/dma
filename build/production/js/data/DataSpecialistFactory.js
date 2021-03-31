// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger/logger.js?v=0.8.0-beta';
import MetadataSpecialist from '/dma/js/data/MetadataSpecialist.js?v=0.8.0-beta';
import CanvasRosterSpecialist from '/dma/js/data/CanvasRosterSpecialist.js?v=0.8.0-beta';
import WAMAPRosterSpecialist from '/dma/js/data/WAMAPRosterSpecialist.js?v=0.8.0-beta';
import CanvasDataSpecialist from '/dma/js/data/CanvasDataSpecialist.js?v=0.8.0-beta';
import CWDataSpecialist from '/dma/js/data/CWDataSpecialist.js?v=0.8.0-beta';
import WAMAPDataSpecialist from '/dma/js/data/WAMAPDataSpecialist.js?v=0.8.0-beta';
import ExamDataSpecialist from '/dma/js/data/ExamDataSpecialist.js?v=0.8.0-beta';
import PSVTDataSpecialist from '/dma/js/data/PSVTDataSpecialist.js?v=0.8.0-beta';

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