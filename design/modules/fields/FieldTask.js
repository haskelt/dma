{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{ SITE_PATH }}/js/logger/logger.js?v={{VERSION}}';
import DataError from '{{ SITE_PATH }}/js/errors/DataError.js?v={{VERSION}}';
import Task from '{{ SITE_PATH }}/js/tasks/Task.js?v={{VERSION}}';
import DataManager from '{{ SITE_PATH }}/js/data/DataManager.js?v={{VERSION}}';

class FieldTask extends Task {
    
    /**************************************************************************/

    constructor (element) {

	super(element);
	this.label = element.dataset.label;
	this.hasContent = false;
	this.data = null;
	
    } // constructor
    
    /**************************************************************************/

    clearField () {
	/* This method should be implemented by each field type in order
	   to reset the field to an empty state */
	
    } // clearField

    /**************************************************************************/

    wrapUp () {

	try {
	    DataManager.postData(this.id, this.data);
	}
	catch (error) {
	    if (error instanceof DataError) {
		this.clearField();
		this.data = null;
		this.hasContent = false;
		this.parent.setChildStatus(this, 'incomplete');
		error.message = 'Error while processing data for "' + this.label + '": ' + error.message;
		logger.postMessage('ERROR', 'fields', error.message);
	    }
	    throw error;
	}
	
    } // wrapUp
    
    /**************************************************************************/
    
} // FieldTask

export default FieldTask;
