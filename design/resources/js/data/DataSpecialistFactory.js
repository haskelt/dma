{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{SITE_PATH}}/js/logger.js?v={{VERSION}}';
import MetadataSpecialist from '{{SITE_PATH}}/js/data/MetadataSpecialist.js?v={{VERSION}}';
import RosterSpecialist from '{{SITE_PATH}}/js/data/RosterSpecialist.js?v={{VERSION}}';
import CanvasSpecialist from '{{SITE_PATH}}/js/data/CanvasSpecialist.js?v={{VERSION}}';
import CWSpecialist from '{{SITE_PATH}}/js/data/CWSpecialist.js?v={{VERSION}}';
import ExamSpecialist from '{{SITE_PATH}}/js/data/ExamSpecialist.js?v={{VERSION}}';

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
