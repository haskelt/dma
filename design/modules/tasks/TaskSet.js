{{globals.js_copyright_notice}}

import logger from '../logger/logger.js?v={{globals.version}}';
import warning_tracker from '../logger/WarningTracker.js?v={{globals.version}}';
import DataError from '../errors/DataError.js?v={{globals.version}}';
import TaskFactory from './TaskFactory.js?v={{globals.version}}';

class TaskSet  {

    /**************************************************************************/

    constructor (taskSetElement) {

	this.element = taskSetElement;

	this.id = taskSetElement.id;
	this.label = taskSetElement.dataset.label;
	this.previousButton = taskSetElement.querySelector('.tasks__task-set--button[data-action="previous"]');
	this.previousButton.addEventListener('click', this.goToPrevious.bind(this));
	this.nextButton = taskSetElement.querySelector('.tasks__task-set--button[data-action="next"]');
	this.nextButton.addEventListener('click', this.goToNext.bind(this));
	this.messageBox = taskSetElement.querySelector('.tasks__task-set--message-box');

	this.taskSequence = null;
	this.tasks = [];
	this.complete = false;

	// build the subtasks
	for (let taskElement of this.element.querySelectorAll('.tasks__task')){
	    let task = TaskFactory.build(taskElement.dataset.taskType, taskElement);
	    logger.postMessage('TRACE', 'tasks', `Adding ${task.id} to ${this.id}`);
	    this.addTask(task);
	}
	
    } // constructor

    /**************************************************************************/

    setTaskSequence (taskSequence) {

	this.taskSequence = taskSequence;

    } // setTaskSequence
    
    /**************************************************************************/

    addTask (task) {

	task.setTaskSet(this);
	this.tasks.push(task);

    } // addTask

    /**************************************************************************/

    setButtonState (button, state) {

	logger.postMessage('DEBUG', 'tasks', `Setting state of ${button} button for ${this.id} to ${state}`); 

	var theButton = (button == 'previous') ? this.previousButton : this.nextButton;
	switch(state){
	case 'enabled':
	    theButton.disabled = false;
	    theButton.classList.remove('disabled');
	    break;
	case 'disabled':
	    theButton.disabled = true;
	    theButton.classList.add('disabled');
	    break;
	case 'visible':
	    theButton.classList.add('visible');
	    break;
	case 'hidden':
	    theButton.classList.add('hidden');
	    break;
	default:
	    throw new ValueError('Bad state provided to setButtonState');
	}
	
    } // setButtonState
    
    /**************************************************************************/

    goToPrevious () {

	if(this.taskSequence){
	    this.taskSequence.goToPrevious();
	} else {
	    throw new ValueError(`Task sequence not initialized for ${this.id}`);
	}
	
    } // goToPrevious

    /**************************************************************************/

    goToNext () {

	if(this.taskSequence){
	    this.taskSequence.goToNext();
	} else {
	    throw new ValueError(`Task sequence not initialized for ${this.id}`);
	}
	
    } // goToNext

    /**************************************************************************/

    updateStatus () {

	this.clearMessage();
	
	var newComplete = true;
	for(let task of this.tasks){
	    if(!task.isComplete()){
		newComplete = false;
	    }
	}

	if(newComplete != this.complete){
	    this.complete = newComplete;
	    logger.postMessage('DEBUG', 'tasks', `Status of ${this.id} is now ${(this.complete ? 'complete' : 'incomplete')}`);
	    this.setButtonState('next', this.complete ? 'enabled' : 'disabled');
	}

    } // updateStatus

    /**************************************************************************/

    show () {
	
	this.element.classList.remove('collapsed');

    } // show
    
    /**************************************************************************/

    hide () {

	this.element.classList.add('collapsed');

    } // show
    
    /**************************************************************************/

    setup () {

	logger.postMessage('TRACE', 'tasks', 'Doing setup for task ' + this.id);
	warning_tracker.resetMessages(this.id);
	warning_tracker.startTracking(this.id);
	for(let task of this.tasks){
	    task.setup();
	}
	warning_tracker.stopTracking();
	
    } // setup
    
    /**************************************************************************/

    wrapUp () {

	logger.postMessage('TRACE', 'tasks', 'Doing wrap-up for ' + this.id);
	warning_tracker.startTracking(this.id);
	try {
	    for(let task of this.tasks){
		task.wrapUp();
	    }
	}
	catch (error) {
	    if (error instanceof DataError){
		logger.postMessage('DEBUG', 'tasks', 'Interrupted wrap-up for task ' + this.id + ' due to error.');
		this.showMessage(error.message);
	    }
	    throw error;
	}
	warning_tracker.stopTracking();
	
    } // wrapUp
    
    /**************************************************************************/

    showMessage (message) {

	this.messageBox.innerText = message;
	this.messageBox.classList.remove('hidden');
	
    } // showMessage
    
    /**************************************************************************/

    clearMessage () {

	this.messageBox.classList.add('hidden');
	this.messageBox.innerText = '';
	
    } // clearMessage
    
    /**************************************************************************/

} // TaskSet

export default TaskSet;
