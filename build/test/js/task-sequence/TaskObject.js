import TaskHierarchyObject from '/js/task-sequence/TaskHierarchyObject.js';

class TaskObject extends TaskHierarchyObject {

/*****************************************************************************/

    constructor (element) {

	super();
	this.button = element.querySelector('.task-sequence__subtask--button');
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