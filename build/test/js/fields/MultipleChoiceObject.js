// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0
import logger from '/js/logger.js';
import TaskHierarchyObject from '/js/tasks/TaskHierarchyObject.js';

class MultipleChoiceObject extends TaskHierarchyObject {
    
/*****************************************************************************/

    constructor (element) {

	super(element);
	this.options = element.querySelectorAll('.fields__multiple-choice--option');
	for(let option of this.options){
	    option.addEventListener('input', this.handleInput.bind(this));
	}
	this.hasContent = false;
	
    } // constructor
    
/*****************************************************************************/

    handleInput (e) {

	var newHasContent = false;
	for(let option of this.options){
	    if(option.checked){
		newHasContent = true;
	    }
	}
	if(newHasContent != this.hasContent){
	    this.hasContent = newHasContent;
	    logger.postMessage('DEBUG', 'fields', 'Multiple choice option has been selected for ' + this.id);	
	    this.parent.setChildStatus(this, this.hasContent ? 'complete' : 'incomplete');
	}

    } // handleInput
    
/*****************************************************************************/
    
} // MultipleChoiceObject

export default MultipleChoiceObject;