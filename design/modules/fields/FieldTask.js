{{project.js_copyright_notice}}

import logger from '{{project.site_path}}/js/logger/logger.js?v={{project.version}}';
import DataError from '{{project.site_path}}/js/errors/DataError.js?v={{project.version}}';
import Task from '{{project.site_path}}/js/tasks/Task.js?v={{project.version}}';
import DataManager from '{{project.site_path}}/js/data/DataManager.js?v={{project.version}}';

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
	    if(this.data){
		DataManager.postData(this.id, this.data);
	    }
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
