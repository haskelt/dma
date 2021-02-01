// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger/logger.js?v=0.2.0-beta';
import Task from '/dma/js/tasks/Task.js?v=0.2.0-beta';
import DataManager from '/dma/js/data/DataManager.js?v=0.2.0-beta';

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