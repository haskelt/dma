{{globals.js_copyright_notice}}

import logger from '{{globals.site_path}}/js/logger/logger.js?v={{globals.version}}';
import MetadataSpecialist from '{{globals.site_path}}/js/data/MetadataSpecialist.js?v={{globals.version}}';
import CanvasRosterSpecialist from '{{globals.site_path}}/js/data/CanvasRosterSpecialist.js?v={{globals.version}}';
import WAMAPRosterSpecialist from '{{globals.site_path}}/js/data/WAMAPRosterSpecialist.js?v={{globals.version}}';
import CanvasDataSpecialist from '{{globals.site_path}}/js/data/CanvasDataSpecialist.js?v={{globals.version}}';
import CWDataSpecialist from '{{globals.site_path}}/js/data/CWDataSpecialist.js?v={{globals.version}}';
import WAMAPDataSpecialist from '{{globals.site_path}}/js/data/WAMAPDataSpecialist.js?v={{globals.version}}';
import ExamDataSpecialist from '{{globals.site_path}}/js/data/ExamDataSpecialist.js?v={{globals.version}}';
import PSVTDataSpecialist from '{{globals.site_path}}/js/data/PSVTDataSpecialist.js?v={{globals.version}}';
import AutoDataSpecialist from '{{globals.site_path}}/js/data/AutoDataSpecialist.js?v={{globals.version}}';

class DataSpecialistFactory {

    static specialists = {
	'Metadata': MetadataSpecialist,
	'CanvasRoster': CanvasRosterSpecialist,
	'WAMAPRoster': WAMAPRosterSpecialist,
	'CanvasData': CanvasDataSpecialist,
	'CWData': CWDataSpecialist,
	'WAMAPData': WAMAPDataSpecialist,
	'ExamData': ExamDataSpecialist,
	'PSVTData': PSVTDataSpecialist,
	'AutoData': AutoDataSpecialist
    };
    
    /**************************************************************************/

    static build (specialistType) {

	return new this.specialists[specialistType]();
	
    } // build

    /**************************************************************************/

} // DataSpecialistFactory

export default DataSpecialistFactory;
