// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger/logger.js?v=0.3.0-beta';
import FieldTask from '/dma/js/fields/FieldTask.js?v=0.3.0-beta';

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
	    logger.postMessage('DEBUG', 'fields', 'Select option has been chosen for ' + this.id);	
	    this.parent.setChildStatus(this, 'complete');
	}
	this.data = this.select.children[this.select.selectedIndex].value;

    } // handleChange
    
    /**************************************************************************/

    clearField () {

	this.select.selectedIndex = -1;
	
    } // clearField
    
    /**************************************************************************/
    
} // SelectTask

export default SelectTask;