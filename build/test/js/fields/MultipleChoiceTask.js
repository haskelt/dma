// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger/logger.js?v=0.18.0-beta';
import FieldTask from '/js/fields/FieldTask.js?v=0.18.0-beta';

class MultipleChoiceTask extends FieldTask {
    
    /**************************************************************************/

    constructor (element) {

	super(element);
	this.options = element.querySelectorAll('.fields__multiple-choice--option');
	for(let option of this.options){
	    option.addEventListener('input', this.handleInput.bind(this));
	}
	
    } // constructor
    
    /**************************************************************************/

    handleInput (e) {

	var newHasContent = false;
	for(let option of this.options){
	    if(option.checked){
		newHasContent = true;
		this.data = option.value;
		logger.postMessage('INFO', 'fields', 'Option "' + this.data + '" chosen for "' + this.label + '"');
	    }
	}
	if(newHasContent != this.hasContent){
	    this.hasContent = newHasContent;
	    logger.postMessage('DEBUG', 'fields', 'Task ' + this.id + ' is now complete');	
	    this.parent.setChildStatus(this, this.hasContent ? 'complete' : 'incomplete');
	}

    } // handleInput
    
    /**************************************************************************/

    clearField () {

	for(let option of this.options){
	    if(option.checked){
		option.checked = false;
	    }
	}
	
    } // clearField
    
    /**************************************************************************/
    
} // MultipleChoiceTask

export default MultipleChoiceTask;