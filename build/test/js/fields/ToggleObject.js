import logger from '/js/logger.js';
import TaskHierarchyObject from '/js/tasks/TaskHierarchyObject.js';

class ToggleObject extends TaskHierarchyObject {

/*****************************************************************************/

    constructor (element) {

	super(element);
	this.button = element.querySelector('.tasks__task--button');
	this.button.addEventListener('click', this.handleButton.bind(this));
	this.isCompleted = false;
	
    } // constructor

/******************************************************************************/
    
    handleButton (e) {

	this.isCompleted = !this.isCompleted;
	this.button.innerText = (this.isCompleted ? 'Click me to undo this task' : 'Click me to complete this task');
	logger.postMessage('DEBUG', 'fields', 'Status of toggle task ' + this.id + ' has changed to ' + this.isCompleted);
	this.parent.setChildStatus(this, this.isCompleted ? 'complete' : 'incomplete');
	
    } // handleButton
	
/******************************************************************************/
    
} // ToggleObject

export default ToggleObject;