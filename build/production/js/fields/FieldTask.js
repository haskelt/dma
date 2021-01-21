// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger.js';
import DataError from '/dma/js/errors/DataError.js';
import Task from '/dma/js/tasks/Task.js';
import DataManager from '/dma/js/data/DataManager.js';

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
		alert(error.message);
	    }
	    throw error;
	}
	
    } // wrapUp
    
    /**************************************************************************/
    
} // FieldTask

export default FieldTask;