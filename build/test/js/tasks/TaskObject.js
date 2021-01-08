import TaskHierarchyObject from '/js/tasks/TaskHierarchyObject.js';

class TaskObject extends TaskHierarchyObject {

/*****************************************************************************/

    constructor (element) {

	super(element);
	this.button = element.querySelector('.task-sequence__task--button');
	this.button.addEventListener('click', this.handleButton.bind(this));
	this.isCompleted = false;
	
    } // constructor

/******************************************************************************/
    
    handleButton (e) {

	this.isCompleted = !this.isCompleted;
	this.button.innerText = (this.isCompleted ? 'True' : 'False');
	this.parent.setChildStatus(this, this.isCompleted ? 'complete' : 'incomplete');
	console.log('subtask status is ' + this.isCompleted);
	
    } // handleButton
	
/******************************************************************************/
    
} // TaskObject

export default TaskObject;