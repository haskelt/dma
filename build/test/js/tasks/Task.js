// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';

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

	for(let child of this.children){
	    child['object'].setup();
	}
	
    } // setup
    
    /**************************************************************************/

    wrapUp () {

	for(let child of this.children){
	    child['object'].wrapUp();
	}
	
    } // wrapup
    
    /**************************************************************************/

    
} // Task

export default Task;