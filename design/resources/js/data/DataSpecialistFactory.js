{{project.js_copyright_notice}}

import logger from '{{project.site_path}}/js/logger/logger.js?v={{project.version}}';
import MetadataSpecialist from '{{project.site_path}}/js/data/MetadataSpecialist.js?v={{project.version}}';
import CanvasRosterSpecialist from '{{project.site_path}}/js/data/CanvasRosterSpecialist.js?v={{project.version}}';
import WAMAPRosterSpecialist from '{{project.site_path}}/js/data/WAMAPRosterSpecialist.js?v={{project.version}}';
import CanvasDataSpecialist from '{{project.site_path}}/js/data/CanvasDataSpecialist.js?v={{project.version}}';
import CWDataSpecialist from '{{project.site_path}}/js/data/CWDataSpecialist.js?v={{project.version}}';
import WAMAPDataSpecialist from '{{project.site_path}}/js/data/WAMAPDataSpecialist.js?v={{project.version}}';
import ExamDataSpecialist from '{{project.site_path}}/js/data/ExamDataSpecialist.js?v={{project.version}}';
import PSVTDataSpecialist from '{{project.site_path}}/js/data/PSVTDataSpecialist.js?v={{project.version}}';

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
