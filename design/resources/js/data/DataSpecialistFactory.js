{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{SITE_PATH}}/js/logger.js';
import MetadataSpecialist from '{{SITE_PATH}}/js/data/MetadataSpecialist.js';
import RosterSpecialist from '{{SITE_PATH}}/js/data/RosterSpecialist.js';
import CanvasSpecialist from '{{SITE_PATH}}/js/data/CanvasSpecialist.js';
import CWSpecialist from '{{SITE_PATH}}/js/data/CWSpecialist.js';
import ExamSpecialist from '{{SITE_PATH}}/js/data/ExamSpecialist.js';

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
