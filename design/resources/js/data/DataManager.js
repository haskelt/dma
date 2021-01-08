{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{ SITE_PATH }}/js/logger.js';

class DataManager {

    static data = {};
    
    /**************************************************************************/

    static postData (tag, data) {

	logger.postMessage('DEBUG', 'data', 'Receiving data for tag ' + tag + ' of ' + data);
	DataManager.data[tag] = data;
	
    } // postData
    
    /**************************************************************************/

}

export default DataManager;
