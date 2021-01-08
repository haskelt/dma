// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';
import TaskHierarchyObject from '/js/tasks/TaskHierarchyObject.js';

class TaskSetObject extends TaskHierarchyObject {

/*****************************************************************************/

    constructor (taskSetElement) {

	super(taskSetElement);
	this.container = taskSetElement.querySelector('.task-sequence__task--container');
	
    } // constructor

/******************************************************************************/

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
    
/******************************************************************************/
    
} // TaskSetObject

export default TaskSetObject;