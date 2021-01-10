{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{ SITE_PATH }}/js/logger.js';
import Task from '{{ SITE_PATH }}/js/tasks/Task.js';
import DataManager from '{{ SITE_PATH }}/js/data/DataManager.js';

class ValidationTask extends Task {

    /**************************************************************************/

    constructor (element) {

	super(element);
	
    } // constructor

    /**************************************************************************/
    
    setup () {

	try {
	    DataManager.validateData();
	    this.parent.setChildStatus(this, 'complete');
	}
	catch(error){
	    logger.postMessage('ERROR', 'data', error.message);
	    alert(error.message);
	}
	
    } // setup
	
    /**************************************************************************/
    
} // ValidationTask

export default ValidationTask;
