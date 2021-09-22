{{globals.js_copyright_notice}}

import logger from '../logger/logger.js?v={{globals.version}}';
import Task from '../tasks/Task.js?v={{globals.version}}';

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
