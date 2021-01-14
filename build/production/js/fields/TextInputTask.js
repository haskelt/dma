// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger.js';
import Task from '/dma/js/tasks/Task.js';
import DataManager from '/dma/js/data/DataManager.js';

class TextInputTask extends Task {
    
    /**************************************************************************/

    constructor (element) {

	super(element);
	this.input = element.querySelector('.fields__text-input--input');
	this.input.addEventListener('input', this.handleInput.bind(this));
	this.hasContent = false;
	
    } // constructor
    
    /**************************************************************************/

    handleInput (e) {

	var newHasContent = (this.input.value != '');
	if(newHasContent != this.hasContent){
	    this.hasContent = newHasContent;
	    logger.postMessage('DEBUG', 'fields', 'Content of text input ' + this.id + ' has changed to ' + this.input.value);	
	    this.parent.setChildStatus(this, this.hasContent ? 'complete' : 'incomplete');
	}

    } // handleInput
    
    /**************************************************************************/

    wrapUp () {

	DataManager.postData(this.id, this.input.value);
	
    } // wrapUp
    
    /**************************************************************************/
    
} // TextInputTask

export default TextInputTask;