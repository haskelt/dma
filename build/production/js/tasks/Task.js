// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger/logger.js?v=0.16.0-beta';

class Task {

    /**************************************************************************/

    constructor (element) {

	this.id = element.id;
	this.parent = null;
	this.children = [];
	
    } // constructor

    /**************************************************************************/

    setParent (parent) {

	logger.postMessage('TRACE', 'tasks', 'Setting parent of ' + this.id + ' to ' + parent.id);
	this.parent = parent;

    } // setParent
    
    /**************************************************************************/

    addChild (child) {

	this.children.push({ 'object': child, 'status': null });
	logger.postMessage('TRACE', 'tasks', 'Set ' + child.id + ' as child of ' + this.id);

    } // addChild

    /**************************************************************************/

    setChildStatus (child, status) {
	logger.postMessage('DEBUG', 'tasks', 'Changing status of ' + child.id + ' in parent ' + this.id + ' to ' + status);

	var childIndex = this.children.findIndex(entry => entry['object'].id == child.id);
	this.children[childIndex]['status'] = status;
	
    } // setChildStatus

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

	try {
	    DataManager.postData(this.id, this.data);
	}
	catch (error) {
	    for(let option of this.options){
		if(option.checked){
		    option.checked = false;
		}
	    }
	    this.hasContent = false;
	    this.choice = null;
	    this.parent.setChildStatus(this, 'incomplete');
	    error.message = 'Error while recording data from field "' + this.id + '": ' + error.message;
	    logger.postMessage('ERROR', 'tasks', error.message);
	    throw error;
	}
	
    } // wrapUp
    
    /**************************************************************************/

    
} // Task

export default Task;