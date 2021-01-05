import TaskHierarchyObject from '/js/task-sequence/TaskHierarchyObject.js';

class TaskSetObject extends TaskHierarchyObject {

/*****************************************************************************/

    constructor (element, parent) {

	super();
	this.parent = parent;
	this.container = element.querySelector('.task-sequence__task--container');
	
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
	this.parent.setChildStatus(this, taskStatus);
	console.log('Completion status of task: ' + taskStatus);
    }
    
/******************************************************************************/
    
} // TaskSetObject

export default TaskSetObject;