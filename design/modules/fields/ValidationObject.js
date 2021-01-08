import logger from '{{ SITE_PATH }}/js/logger.js';
import TaskHierarchyObject from '{{ SITE_PATH }}/js/tasks/TaskHierarchyObject.js';

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
