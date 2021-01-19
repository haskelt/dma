{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{ SITE_PATH }}/js/logger.js';
import Task from '{{ SITE_PATH }}/js/tasks/Task.js';
import DataManager from '{{ SITE_PATH }}/js/data/DataManager.js';

class SelectTask extends Task {
    
    /**************************************************************************/

    constructor (element) {

	super(element);
	this.select = element.querySelector('.fields__select--select');
	this.select.addEventListener('change', this.handleChange.bind(this));
	this.choice = null;
	
    } // constructor
    
    /**************************************************************************/

    handleChange (e) {

	if(!this.choice){
	    logger.postMessage('DEBUG', 'fields', 'Select option has been chosen for ' + this.id);	
	    this.parent.setChildStatus(this, 'complete');
	}
	this.choice = this.select.children[this.select.selectedIndex].value;

    } // handleChange
    
    /**************************************************************************/

    wrapUp () {

	DataManager.postData(this.id, this.choice);
	
    } // wrapUp
    
    /**************************************************************************/
    
} // SelectTask

export default SelectTask;
