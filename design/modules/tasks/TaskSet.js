{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{ SITE_PATH }}/js/logger.js';
import DataError from '{{ SITE_PATH }}/js/errors/DataError.js';
import Task from '{{ SITE_PATH }}/js/tasks/Task.js';

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
		logger.postMessage('ERROR', 'tasks', 'Interrupted wrap-up for task ' + this.id + ' due to error.');
	    }
	    throw error;
	}
	
    } // wrapUp
    
    /**************************************************************************/
    
} // TaskSet

export default TaskSet;
