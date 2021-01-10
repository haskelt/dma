import logger from '{{ SITE_PATH }}/js/logger.js';
import TaskHierarchyObject from '{{ SITE_PATH }}/js/tasks/TaskHierarchyObject.js';

class TaskSequenceObject extends TaskHierarchyObject {

/*****************************************************************************/

    constructor (sequenceElement) {

	super(sequenceElement);
	this.task_wrappers = [];
	for (let taskWrapper of sequenceElement.querySelectorAll('.tasks__task-wrapper')){
	    let task_wrapper_data = {};
	    task_wrapper_data['container'] = taskWrapper.querySelector('.tasks__task-wrapper--container');
	    task_wrapper_data['previous_button'] = taskWrapper.querySelector('.tasks__task-wrapper--button[data-action="previous"]');
	    task_wrapper_data['previous_button'].addEventListener('click', this.goToPrevious.bind(this));
	    task_wrapper_data['next_button'] = taskWrapper.querySelector('.tasks__task-wrapper--button[data-action="next"]');
	    task_wrapper_data['next_button'].addEventListener('click', this.goToNext.bind(this));
	    this.task_wrappers.push(task_wrapper_data);
	}

	this.cur_task = 0;
	
	// make the first task visible
	this.show(this.cur_task);
	// hide the <previous> button for the first task
	this.setButtonState(0, 'previous_button', 'hidden');
	// hide the <next> button for the last task
//	this.setButtonState(this.task_wrappers.length - 1, 'next_button', 'hidden');
	
    } // constructor

/******************************************************************************/

    setup () {

	this.children[this.cur_task]['object'].setup();
	
    } // setup
    
/******************************************************************************/
    
    show (task_index) {

	this.task_wrappers[task_index]['container'].classList.remove('collapsed');

    } // show

/******************************************************************************/

    hide (task_index) {

	this.task_wrappers[task_index]['container'].classList.add('collapsed');

    } // hide

/******************************************************************************/

    setButtonState (task_index, button, state) {

	logger.postMessage('DEBUG', 'tasks', 'Setting state of button ' + button + ' for task wrapper ' + task_index + ' to ' + state); 
	if(state == 'hidden'){
	    this.task_wrappers[task_index][button].classList.add('hidden');
	} else if(state == 'visible'){
	    this.task_wrappers[task_index][button].classList.remove('hidden');
	} else if(state == 'disabled'){
	    this.task_wrappers[task_index][button].disabled = true;
	} else if(state == 'enabled'){
	    this.task_wrappers[task_index][button].disabled = false;
	} else {
	    throw 'Unrecognized button state <' + state + '>';
	}
	
    } // setButtonState
    
/******************************************************************************/
    
    goToPrevious () {

	if(this.cur_task > 0){
	    logger.postMessage('DEBUG', 'tasks', 'Moving backward from task wrapper ' + this.cur_task + ' to task wrapper ' + (this.cur_task - 1));
	    this.hide(this.cur_task);
	    this.show(this.cur_task - 1);
	    this.cur_task--;
	}

    } // goToPrevious

/******************************************************************************/
	
    goToNext () {

	if(this.cur_task < this.task_wrappers.length - 1){
	    logger.postMessage('DEBUG', 'tasks', 'Moving forward from task wrapper ' + this.cur_task + ' to task wrapper ' + (this.cur_task + 1));
	    this.children[this.cur_task]['object'].wrapup();
	    this.hide(this.cur_task);
	    this.show(this.cur_task + 1);
	    this.cur_task++;
	    this.children[this.cur_task]['object'].setup();
	}
	
    } // goToNext
    
/******************************************************************************/

    setChildStatus (child, status) {
	
	super.setChildStatus(child, status);
	var childIndex = this.children.findIndex(entry => entry['object'] == child);
	this.setButtonState(childIndex, 'next_button', status == 'complete' ? 'enabled' : 'disabled');

    } // setChildStatus
	
/******************************************************************************/

} // TaskSequenceObject

export default TaskSequenceObject
