// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';
import RosterSpecialist from '/js/data/RosterSpecialist.js';
import CanvasSpecialist from '/js/data/CanvasSpecialist.js';
import CWSpecialist from '/js/data/CWSpecialist.js';

class DataSpecialistFactory {

    static specialists = {
	'Roster': RosterSpecialist,
	'Canvas': CanvasSpecialist,
	'CW': CWSpecialist
    };
    
    /**************************************************************************/

    static build (specialistType) {

	return new this.specialists[specialistType]();
	
    } // build

    /**************************************************************************/

} // DataSpecialistFactory

export default DataSpecialistFactory;