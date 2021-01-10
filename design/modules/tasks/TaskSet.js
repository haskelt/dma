{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{ SITE_PATH }}/js/logger.js';
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
    
} // TaskSet

export default TaskSet;
