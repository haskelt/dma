{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{ SITE_PATH }}/js/logger/logger.js?v={{VERSION}}';
import Task from '{{ SITE_PATH }}/js/tasks/Task.js?v={{VERSION}}';
import DataManager from '{{ SITE_PATH }}/js/data/DataManager.js?v={{VERSION}}';

class ExportButtonTask extends Task {
    
    /**************************************************************************/

    constructor (element) {

	super(element);
	this.button = element.querySelector('.fields__export-button--button');
	this.button.addEventListener('click', this.handleClick.bind(this));
	
    } // constructor
    
    /**************************************************************************/

    setup () {

	try {
	    DataManager.finalizeData();
	    logger.postMessage('TRACE', 'fields', 'Enabling export button');
	    this.button.disabled = false;;
	    /* Set the task as complete from the start, on the logic that
	       clicking the button is optional. */
	    this.parent.setChildStatus(this, 'complete');
	}
	catch (error) {
	    logger.postMessage('TRACE', 'fields', 'Disabling export button');
	    this.button.disabled = true;
	    throw error;
	}
	
    } // setup

    /**************************************************************************/
    
    handleClick (e) {

	logger.postMessage('DEBUG', 'fields', 'Beginning export');
	DataManager.exportData();
	
    } // handleClick

    /**************************************************************************/

} // ExportButtonTask

export default ExportButtonTask;
