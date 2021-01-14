// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger.js';
import Task from '/dma/js/tasks/Task.js';
import DataManager from '/dma/js/data/DataManager.js';

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