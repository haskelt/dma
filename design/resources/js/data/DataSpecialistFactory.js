{{project.js_copyright_notice}}

import logger from '{{project.site_path}}/js/logger/logger.js?v={{project.version}}';
import MetadataSpecialist from '{{project.site_path}}/js/data/MetadataSpecialist.js?v={{project.version}}';
import RosterSpecialist from '{{project.site_path}}/js/data/RosterSpecialist.js?v={{project.version}}';
import CanvasSpecialist from '{{project.site_path}}/js/data/CanvasSpecialist.js?v={{project.version}}';
import CWSpecialist from '{{project.site_path}}/js/data/CWSpecialist.js?v={{project.version}}';
import ExamSpecialist from '{{project.site_path}}/js/data/ExamSpecialist.js?v={{project.version}}';

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
