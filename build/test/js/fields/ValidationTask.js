// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';
import Task from '/js/tasks/Task.js';
import DataManager from '/js/data/DataManager.js';

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