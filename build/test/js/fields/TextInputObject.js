// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0
import logger from '/js/logger.js';
import TaskHierarchyObject from '/js/tasks/TaskHierarchyObject.js';

class TextInputObject extends TaskHierarchyObject {
    
/*****************************************************************************/

    constructor (element) {

	super(element);
	this.input = element.querySelector('.fields__text-input--input');
	this.input.addEventListener('input', this.handleInput.bind(this));
	this.hasContent = false;
	
    } // constructor
    
/*****************************************************************************/

    handleInput (e) {

	console.log('got input');
	var newHasContent = (this.input.value != '');
	if(newHasContent != this.hasContent){
	    this.hasContent = newHasContent;
	    logger.postMessage('DEBUG', 'fields', 'Content of text input ' + this.id + ' has changed to ' + this.input.value);	
	    this.parent.setChildStatus(this, this.hasContent ? 'complete' : 'incomplete');
	}

    } // handleInput
    
/*****************************************************************************/
    
} // TextInputObject

export default TextInputObject;