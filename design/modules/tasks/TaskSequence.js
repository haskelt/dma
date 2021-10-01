{{globals.js_copyright_notice}}

import logger from '../logger/logger.js?v={{globals.version}}';
import config from '../config.js?v={{globals.version}}';
import DataError from '../errors/DataError.js?v={{globals.version}}';
import UserInputNeeded from '../errors/UserInputNeeded.js?v={{globals.version}}';
import errors from '../errors/errors.js?v={{globals.version}}';
import ConfigError from '../errors/ConfigError.js?v={{globals.version}}';
import TemplateManager from '../templates/TemplateManager.js?v={{globals.version}}';
import Task from './Task.js?v={{globals.version}}';
import TaskSet from './TaskSet.js?v={{globals.version}}';
import TaskFactory from './TaskFactory.js?v={{globals.version}}';

class TaskSequence extends Task {

    /**************************************************************************/

    constructor (sequenceElement) {

	super(sequenceElement);
	
	// build the task layout in the DOM
	config.getConfig('layout').forEach(taskSpecs => sequenceElement.appendChild(this.buildTaskElement(taskSpecs)));
	
	// initialize the sub-tasks in each task set
	for (let taskSetElement of sequenceElement.querySelectorAll('.tasks__task-set')){
	    let taskSet = new TaskSet(taskSetElement);
	    this.addChild(taskSet);
	    taskSet.setParent(this);
	    for (let taskElement of taskSetElement.querySelectorAll('.tasks__task')){
		let task = TaskFactory.build(taskElement.dataset.taskType, taskElement);
		taskSet.addChild(task);
		task.setParent(taskSet);
	    }
	}
	
	// configure the wrappers (previous and next buttons)
	this.taskWrappers = [];
	for (let taskWrapperElement of sequenceElement.querySelectorAll('.tasks__task-wrapper')){
	    let taskWrapperData = {};
	    taskWrapperData['wrapper'] = taskWrapperElement;
	    taskWrapperData['label'] = taskWrapperElement.dataset.label;
	    taskWrapperData['container'] = taskWrapperElement.querySelector('.tasks__task-wrapper--container');
	    taskWrapperData['previous_button'] = taskWrapperElement.querySelector('.tasks__task-wrapper--button[data-action="previous"]');
	    taskWrapperData['previous_button'].addEventListener('click', this.goToPrevious.bind(this));
	    taskWrapperData['next_button'] = taskWrapperElement.querySelector('.tasks__task-wrapper--button[data-action="next"]');
	    taskWrapperData['next_button'].addEventListener('click', this.goToNext.bind(this));
	    this.taskWrappers.push(taskWrapperData);
	}

	this.curTask = 0;
	
	// make the first task set visible
	this.show(this.curTask);
	// hide the <previous> button for the first task set
	this.setButtonState(0, 'previous_button', 'hidden');
	// hide the <next> button for the last task set
	this.setButtonState(this.taskWrappers.length - 1, 'next_button', 'hidden');

	// call the setup hook for this task
	this.setup();
	
    } // constructor

    /**************************************************************************/

    buildTaskElement (taskSpecs){

	var taskElement = TemplateManager.expand(taskSpecs.template, taskSpecs.parameters);
	if('children' in taskSpecs){
	    var childContainer = taskElement.querySelector('.tasks__child-tasks');
	    if(!childContainer){
		throw new ConfigError('Attempt to add children to template ' + taskSpecs.template + ', but that template does not permit children');
	    }
	    for(let child of taskSpecs.children){
		var childElement = this.buildTaskElement(child);
		childContainer.appendChild(childElement);
	    }
	}
	return taskElement;

    } // buildTaskElement

    /**************************************************************************/

    setup () {

	this.children[this.curTask]['object'].setup();
	
    } // setup
    
    /**************************************************************************/
    
    show (taskIndex) {

	this.taskWrappers[taskIndex]['wrapper'].classList.remove('collapsed');

    } // show

    /**************************************************************************/

    hide (taskIndex) {

	this.taskWrappers[taskIndex]['wrapper'].classList.add('collapsed');

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
	    this.taskWrappers[taskIndex][button].classList.add('disabled');
	} else if(state == 'enabled'){
	    this.taskWrappers[taskIndex][button].disabled = false;
	    this.taskWrappers[taskIndex][button].classList.remove('disabled');
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
		} else if (error instanceof UserInputNeeded) {
		    errors.setResumePoint(this.goToNext.bind(this));
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
