{{globals.js_copyright_notice}}

import logger from '../logger/logger.js?v={{globals.version}}';
import DataError from '../errors/DataError.js?v={{globals.version}}';
import Task from '../tasks/Task.js?v={{globals.version}}';
import DataManager from '../data/DataManager.js?v={{globals.version}}';

class FieldTask extends Task {
    
    /**************************************************************************/

    constructor (element, parent) {

	super(element, parent);
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
		this.setComplete(false);
		error.message = 'Error while processing data for "' + this.label + '": ' + error.message;
		logger.postMessage('ERROR', 'fields', error.message);
	    }
	    throw error;
	}
	
    } // wrapUp
    
    /**************************************************************************/
    
} // FieldTask

export default FieldTask;
