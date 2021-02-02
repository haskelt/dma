// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger/logger.js?v=0.6.0-beta';
import DataError from '/js/errors/DataError.js?v=0.6.0-beta';
import Task from '/js/tasks/Task.js?v=0.6.0-beta';

class TaskSet extends Task {

    /**************************************************************************/

    constructor (taskSetElement) {

	super(taskSetElement);
	this.container = taskSetElement.querySelector('.task-sequence__task--container');
	
    } // constructor

    /**************************************************************************/

    setChildStatus (child, status) {

	super.setChildStatus(child, status);
	var taskStatus = 'complete';
	for(let child of this.children){
	    if(child['status'] != 'complete'){
		taskStatus = 'incomplete';
	    }
	}
	logger.postMessage('DEBUG', 'tasks', 'Status of task ' + this.id + ' is now ' + taskStatus);
	this.parent.setChildStatus(this, taskStatus);
    }
    
    /**************************************************************************/

    setup () {

	logger.postMessage('TRACE', 'tasks', 'Doing setup for task ' + this.id);
	for(let child of this.children){
	    child['object'].setup();
	}
	
    } // setup
    
    /**************************************************************************/

    wrapUp () {

	logger.postMessage('TRACE', 'tasks', 'Doing wrap-up for task ' + this.id);
	try {
	    for(let child of this.children){
		child['object'].wrapUp();
	    }
	}
	catch (error) {
	    if (error instanceof DataError){
		logger.postMessage('DEBUG', 'tasks', 'Interrupted wrap-up for task ' + this.id + ' due to error.');
	    }
	    throw error;
	}
	
    } // wrapUp
    
    /**************************************************************************/
    
} // TaskSet

export default TaskSet;