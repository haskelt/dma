{{globals.js_copyright_notice}}

import logger from '../logger/logger.js?v={{globals.version}}';
import config from '../config.js?v={{globals.version}}';
import DataError from '../errors/DataError.js?v={{globals.version}}';
import UserInputNeeded from '../errors/UserInputNeeded.js?v={{globals.version}}';
import errors from '../errors/errors.js?v={{globals.version}}';
import TaskSet from './TaskSet.js?v={{globals.version}}';

class TaskSequence {

    /**************************************************************************/

    constructor (sequenceElement) {

	this.id = sequenceElement.id;
	
	// initialize each task set
	this.taskSets = [];
	for (let taskSetElement of sequenceElement.querySelectorAll('.tasks__task-set')){
	    let taskSet = new TaskSet(taskSetElement);
	    logger.postMessage('TRACE', 'tasks', `Adding ${taskSet.id} to task sequence`);
	    this.addTaskSet(taskSet);
	}
	
	this.curTask = 0;
	
	// make the first task set visible
	this.taskSets[this.curTask].show();
	// hide the <previous> button for the first task set
	this.taskSets[0].setButtonState('previous', 'hidden');
	// hide the <next> button for the last task set
	this.taskSets[this.taskSets.length - 1].setButtonState('next', 'hidden');
	
    } // constructor

    /**************************************************************************/

    addTaskSet (taskSet) {

	taskSet.setTaskSequence(this);
	this.taskSets.push(taskSet);

    } // addTaskSet
    
    /**************************************************************************/

    goToPrevious () {

	if(this.curTask > 0){
	    logger.postMessage('INFO', 'tasks', `Going back to "${this.taskSets[this.curTask - 1].label}"`);
	    this.taskSets[this.curTask].hide();
	    this.taskSets[this.curTask - 1].show();
	    this.curTask--;
	}

    } // goToPrevious

    /**************************************************************************/
	
    goToNext () {

	if(this.curTask < this.taskSets.length - 1){
	    logger.postMessage('INFO', 'tasks', `Moving forward to "${this.taskSets[this.curTask + 1].label}"`);
	    try {
		this.taskSets[this.curTask].wrapUp();
		this.taskSets[this.curTask].hide();
		this.taskSets[this.curTask + 1].show();
		this.curTask++;
		this.taskSets[this.curTask].setup();
	    }
	    catch (error) {
		if (error instanceof DataError) {
		    logger.postMessage('DEBUG', 'tasks', 'Advancing to next taskset interrupted by error.');
		} else if (error instanceof UserInputNeeded) {
		    errors.setResumePoint(this.goToNext.bind(this));
		} else {
		    throw error;
		}
	    }
	}
	
    } // goToNext
    
    /**************************************************************************/

} // TaskSequence

export default TaskSequence
