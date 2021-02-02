// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger/logger.js?v=0.4.0-beta';
import DataError from '/js/errors/DataError.js?v=0.4.0-beta';
import Task from '/js/tasks/Task.js?v=0.4.0-beta';

class TaskSequence extends Task {

    /**************************************************************************/

    constructor (sequenceElement) {

	super(sequenceElement);
	this.taskWrappers = [];
	for (let taskWrapperElement of sequenceElement.querySelectorAll('.tasks__task-wrapper')){
	    let taskWrapperData = {};
	    taskWrapperData['label'] = taskWrapperElement.dataset.label;
	    taskWrapperData['container'] = taskWrapperElement.querySelector('.tasks__task-wrapper--container');
	    taskWrapperData['previous_button'] = taskWrapperElement.querySelector('.tasks__task-wrapper--button[data-action="previous"]');
	    taskWrapperData['previous_button'].addEventListener('click', this.goToPrevious.bind(this));
	    taskWrapperData['next_button'] = taskWrapperElement.querySelector('.tasks__task-wrapper--button[data-action="next"]');
	    taskWrapperData['next_button'].addEventListener('click', this.goToNext.bind(this));
	    this.taskWrappers.push(taskWrapperData);
	}

	this.curTask = 0;
	
	// make the first task visible
	this.show(this.curTask);
	// hide the <previous> button for the first task
	this.setButtonState(0, 'previous_button', 'hidden');
	// hide the <next> button for the last task
	this.setButtonState(this.taskWrappers.length - 1, 'next_button', 'hidden');
	
    } // constructor

    /**************************************************************************/

    setup () {

	this.children[this.curTask]['object'].setup();
	
    } // setup
    
    /**************************************************************************/
    
    show (taskIndex) {

	this.taskWrappers[taskIndex]['container'].classList.remove('collapsed');

    } // show

    /**************************************************************************/

    hide (taskIndex) {

	this.taskWrappers[taskIndex]['container'].classList.add('collapsed');

    } // hide

    /**************************************************************************/

    setButtonState (taskIndex, button, state) {

	logger.postMessage('DEBUG', 'tasks', 'Setting state of button ' + button + ' for task wrapper ' + taskIndex + ' to ' + state); 
	if(state == 'hidden'){
	    this.taskWrappers[taskIndex][button].classList.add('hidden');
	} else if(state == 'visible'){
	    this.taskWrappers[taskIndex][button].classList.remove('hidden');
	} else if(state == 'disabled'){
	    this.taskWrappers[taskIndex][button].disabled = true;
	} else if(state == 'enabled'){
	    this.taskWrappers[taskIndex][button].disabled = false;
	} else {
	    logger.postMessage('ERROR', 'tasks', 'Unrecognized button state <' + state + '>');
	}
	
    } // setButtonState
    
    /**************************************************************************/
    
    goToPrevious () {

	if(this.curTask > 0){
	    logger.postMessage('INFO', 'tasks', 'Going back to "' + this.taskWrappers[this.curTask - 1].label + '"');
	    this.hide(this.curTask);
	    this.show(this.curTask - 1);
	    this.curTask--;
	}

    } // goToPrevious

    /**************************************************************************/
	
    goToNext () {

	if(this.curTask < this.taskWrappers.length - 1){
	    logger.postMessage('DEBUG', 'tasks', 'Moving forward from task wrapper ' + this.curTask + ' to task wrapper ' + (this.curTask + 1));
	    try {
		this.children[this.curTask]['object'].wrapUp();
		logger.postMessage('INFO', 'tasks', 'Completed "' + this.taskWrappers[this.curTask].label + '"');
		this.hide(this.curTask);
		this.show(this.curTask + 1);
		this.curTask++;
		this.children[this.curTask]['object'].setup();
	    }
	    catch (error) {
		if (error instanceof DataError) {
		    logger.postMessage('DEBUG', 'tasks', 'Advancing to next task sequence interrupted by error.');
		} else {
		    throw error;
		}
	    }
	}
	
    } // goToNext
    
    /**************************************************************************/

    setChildStatus (child, status) {
	
	super.setChildStatus(child, status);
	var childIndex = this.children.findIndex(entry => entry['object'] == child);
	this.setButtonState(childIndex, 'next_button', status == 'complete' ? 'enabled' : 'disabled');

    } // setChildStatus
	
    /**************************************************************************/

} // TaskSequence

export default TaskSequence