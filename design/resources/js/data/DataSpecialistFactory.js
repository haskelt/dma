{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{SITE_PATH}}/js/logger.js';
import RosterSpecialist from '{{SITE_PATH}}/js/data/RosterSpecialist.js';
import CanvasSpecialist from '{{SITE_PATH}}/js/data/CanvasSpecialist.js';
import CWSpecialist from '{{SITE_PATH}}/js/data/CWSpecialist.js';

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
