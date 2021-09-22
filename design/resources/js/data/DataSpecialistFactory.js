{{globals.js_copyright_notice}}

import logger from '../logger/logger.js?v={{globals.version}}';

class DataSpecialistFactory {

    static specialists = {};
    
    /*************************************************************************/

    static register (specialistType, specialist) {

	this.specialists[specialistType] = specialist;
	
    } // register
	
    /*************************************************************************/

    static build (specialistType) {

	return new this.specialists[specialistType]();
	
    } // build

    /*************************************************************************/

} // DataSpecialistFactory

export default DataSpecialistFactory;
