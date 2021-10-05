{{globals.js_copyright_notice}}

import logger from '../logger/logger.js?v={{globals.version}}';
import DataManager from '../data/DataManager.js?v={{globals.version}}';
import Task from '../tasks/Task.js?v={{globals.version}}';

class PrepareDataTask extends Task {
    
    /**************************************************************************/

    setup () {

	try {
	    DataManager.finalizeData();
	    logger.postMessage('INFO', 'fields', 'Completed final processing of the data');
	}
	catch (error) {
	    logger.postMessage('ERROR', 'fields', error.message);
	    throw error;
	}
	
    } // setup

    /**************************************************************************/
    
} // PrepareDataTask

export default PrepareDataTask;
