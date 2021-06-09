// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger/logger.js?v=0.16.0-beta';
import Task from '/dma/js/tasks/Task.js?v=0.16.0-beta';

class ToggleTask extends Task {

    /**************************************************************************/

    constructor (element) {

	super(element);
	this.button = element.querySelector('.tasks__task--button');
	this.button.addEventListener('click', this.handleButton.bind(this));
	this.isCompleted = false;
	
    } // constructor

    /**************************************************************************/
    
    handleButton (e) {

	this.isCompleted = !this.isCompleted;
	this.button.innerText = (this.isCompleted ? 'Click me to undo this task' : 'Click me to complete this task');
	logger.postMessage('DEBUG', 'fields', 'Status of toggle task ' + this.id + ' has changed to ' + this.isCompleted);
	this.parent.setChildStatus(this, this.isCompleted ? 'complete' : 'incomplete');
	
    } // handleButton
	
    /**************************************************************************/
    
} // ToggleTask

export default ToggleTask;