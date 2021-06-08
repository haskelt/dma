// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger/logger.js?v=0.15.0-beta';
import FieldTask from '/js/fields/FieldTask.js?v=0.15.0-beta';

class SelectTask extends FieldTask {
    
    /**************************************************************************/

    constructor (element) {

	super(element);
	this.select = element.querySelector('.fields__select--select');
	this.select.addEventListener('change', this.handleChange.bind(this));
	
    } // constructor
    
    /**************************************************************************/

    handleChange (e) {

	if(!this.data){
	    logger.postMessage('DEBUG', 'fields', 'Task ' + this.id + ' is now complete');	
	    this.parent.setChildStatus(this, 'complete');
	}
	this.data = this.select.children[this.select.selectedIndex].value;
	logger.postMessage('INFO', 'fields', 'Option "' + this.data + '" chosen for "' + this.label + '"');

    } // handleChange
    
    /**************************************************************************/

    clearField () {

	this.select.selectedIndex = -1;
	
    } // clearField
    
    /**************************************************************************/
    
} // SelectTask

export default SelectTask;