{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{ SITE_PATH }}/js/logger.js';


class DataSpecialist {

    /**************************************************************************/
    
    constructor () {

    } // constructor
    
    /**************************************************************************/

    doSingleWorksheetCheck (raw_data) {
	/* Check that there's only one worksheet. With multiple worksheets,
	   we don't know which one we're supposed to be looking at. */

	if(Object.keys(raw_data).length != 1){
	    throw Error('Data file can only have one worksheet. Please fix and then reupload the file.');
	} else {
	    this.curData = raw_data[Object.keys(raw_data)[0]];
	}

    } // doSingleWorksheetCheck

    /**************************************************************************/

    doRequiredFieldsCheck (requiredFields) {
	/* Check that any required fields are present */
	
	/* The header value for Canvas fields can be very long (e.g.,
	   containing the full question text), hence the use of
	   'startsWith' */
	for(let field of requiredFields){
	    if(!(field in this.curData[0])){
		throw Error('A column for ' + field + ' is required. Please fix and then reupload the file.');
	    }
	}
	    
    } // doRequiredFieldsCheck

    /**************************************************************************/
    
} // DataSpecialist

export default DataSpecialist;
