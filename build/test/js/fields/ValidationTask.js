// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';
import Task from '/js/tasks/Task.js';
import DataManager from '/js/data/DataManager.js';

class ValidationTask extends Task {

    /**************************************************************************/

    constructor (element) {

	super(element);
	this.message = document.querySelector('.fields__validation--message');
	
    } // constructor

    /**************************************************************************/
    
    setup () {

	try {
	    DataManager.validateData();
	    this.message.classList.remove('hidden');
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