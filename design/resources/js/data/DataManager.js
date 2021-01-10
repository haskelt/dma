{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{ SITE_PATH }}/js/logger.js';
import Roster from '{{ SITE_PATH }}/js/data/Roster.js';
import StudentData from '{{ SITE_PATH }}/js/data/StudentData.js';

class DataManager {

    static setters = { 'roster': Roster.setData.bind(Roster), 'mct_pre': StudentData.setData.bind(StudentData) };
    static data = {};
    
    /**************************************************************************/

    static postData (tag, data) {

	logger.postMessage('DEBUG', 'data', 'Posting data for tag ' + tag + ' of ' + data);
	if(tag in this.setters){
	    this.setters[tag](tag, data);
	} else {
	    this.data[tag] = data;
	}
	
    } // postData
    
    /**************************************************************************/

    static validateData () {

	console.log(Roster.getAnonID('ID', '4215366'));
	
    } // validateData
    
    /**************************************************************************/
    
}

export default DataManager;
