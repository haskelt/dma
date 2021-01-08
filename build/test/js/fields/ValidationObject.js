import logger from '/js/logger.js';
import TaskHierarchyObject from '/js/tasks/TaskHierarchyObject.js';

class ValidationObject extends TaskHierarchyObject {

/*****************************************************************************/

    constructor (element) {

	super(element);
	
    } // constructor

/******************************************************************************/
    
    setup () {

	this.parent.setChildStatus(this, 'complete');
	
    } // setup
	
/******************************************************************************/
    
} // ValidationObject

export default ValidationObject;