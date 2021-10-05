/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import logger from '../logger/logger.js?v=0.24.1-beta';

class Task {

    /**************************************************************************/

    constructor (element, taskSet) {

	this.element = element;
	this.id = element.id;
	this.complete = false;
	this.taskSet = null;
	
    } // constructor

    /**************************************************************************/

    setTaskSet (taskSet) {

	this.taskSet = taskSet;
	
    } // setTaskSet
    
    /**************************************************************************/
    
    setComplete (flag) {

	if(this.complete != flag){
	    this.complete = flag;
	    if(this.taskSet){
		this.taskSet.updateStatus();
	    } else {
		throw new ValueError(`Task set not initialized for ${this.id}`);
	    }
	}
	
    } // setComplete
    
    /**************************************************************************/

    isComplete () {

	return this.complete;
	
    } // isComplete
    
    /**************************************************************************/
    
    setup () {
	/* This method is called when a task is to be made visible to a user.
	   It can be used for things like pre-populating a field based on prior
	   input. It should handle any errors & notify the user, then rethrow
	   so that higher-level code knows something went wrong. */
	
    } // setup
    
    /**************************************************************************/

    wrapUp () {
	/* This method is called when the user is done working with a
	   task and it's going to be made hidden again. It can be used
	   to do things like validating and storing the data that was
	   provided. It should handle any errors & notify the user,
	   then rethrow so that higher-level code knows something went
	   wrong. */
	
    } // wrapUp
    
    /**************************************************************************/

    
} // Task

export default Task;