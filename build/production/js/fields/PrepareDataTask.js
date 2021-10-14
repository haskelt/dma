/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import logger from '../logger/logger.js?v=0.26.1-beta';
import DataManager from '../data/DataManager.js?v=0.26.1-beta';
import Task from '../tasks/Task.js?v=0.26.1-beta';

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