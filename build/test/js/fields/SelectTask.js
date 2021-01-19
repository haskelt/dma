// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';
import Task from '/js/tasks/Task.js';
import DataManager from '/js/data/DataManager.js';

class SelectTask extends Task {
    
    /**************************************************************************/

    constructor (element) {

	super(element);
	this.select = element.querySelector('.fields__select--select');
	this.select.addEventListener('change', this.handleChange.bind(this));
	this.choice = null;
	
    } // constructor
    
    /**************************************************************************/

    handleChange (e) {

	if(!this.choice){
	    logger.postMessage('DEBUG', 'fields', 'Select option has been chosen for ' + this.id);	
	    this.parent.setChildStatus(this, 'complete');
	}
	this.choice = this.select.children[this.select.selectedIndex].value;

    } // handleChange
    
    /**************************************************************************/

    wrapUp () {

	DataManager.postData(this.id, this.choice);
	
    } // wrapUp
    
    /**************************************************************************/
    
} // SelectTask

export default SelectTask;