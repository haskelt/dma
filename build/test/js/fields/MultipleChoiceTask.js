// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';
import Task from '/js/tasks/Task.js';
import DataManager from '/js/data/DataManager.js';

class MultipleChoiceTask extends Task {
    
    /**************************************************************************/

    constructor (element) {

	super(element);
	this.options = element.querySelectorAll('.fields__multiple-choice--option');
	for(let option of this.options){
	    option.addEventListener('input', this.handleInput.bind(this));
	}
	this.hasContent = false;
	this.choice = null;
	
    } // constructor
    
    /**************************************************************************/

    handleInput (e) {

	var newHasContent = false;
	for(let option of this.options){
	    if(option.checked){
		newHasContent = true;
		this.choice = option.value;
	    }
	}
	if(newHasContent != this.hasContent){
	    this.hasContent = newHasContent;
	    logger.postMessage('DEBUG', 'fields', 'Multiple choice option has been selected for ' + this.id);	
	    this.parent.setChildStatus(this, this.hasContent ? 'complete' : 'incomplete');
	}

    } // handleInput
    
    /**************************************************************************/

    wrapUp () {

	DataManager.postData(this.id, this.choice);
	
    } // wrapUp
    
    /**************************************************************************/
    
} // MultipleChoiceTask

export default MultipleChoiceTask;