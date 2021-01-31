// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js?v=0.1.2-beta';
import FieldTask from '/js/fields/FieldTask.js?v=0.1.2-beta';

class TextInputTask extends FieldTask {
    
    /**************************************************************************/

    constructor (element) {

	super(element);
	this.input = element.querySelector('.fields__text-input--input');
	this.input.addEventListener('input', this.handleInput.bind(this));
	this.hasContent = false;
	this.data = null;
	
    } // constructor
    
    /**************************************************************************/

    handleInput (e) {

	var newHasContent = (this.input.value != '');
	if(newHasContent != this.hasContent){
	    this.hasContent = newHasContent;
	    logger.postMessage('DEBUG', 'fields', 'Content of text input ' + this.id + ' has changed to ' + this.input.value);	
	    this.parent.setChildStatus(this, this.hasContent ? 'complete' : 'incomplete');
	}
	this.data = this.input.value;

    } // handleInput
    
    /**************************************************************************/

    clearField () {

	this.input.value = '';
	
    } // clearField

    /**************************************************************************/
    
} // TextInputTask

export default TextInputTask;