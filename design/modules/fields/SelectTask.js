{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{ SITE_PATH }}/js/logger/logger.js?v={{VERSION}}';
import FieldTask from '{{ SITE_PATH }}/js/fields/FieldTask.js?v={{VERSION}}';

class SelectTask extends FieldTask {
    
    /**************************************************************************/

    constructor (element) {

	super(element);
	this.select = element.querySelector('.fields__select--select');
	this.select.addEventListener('change', this.handleChange.bind(this));
	
    } // constructor
    
    /**************************************************************************/

    handleChange (e) {

	if(!this.data){
	    logger.postMessage('DEBUG', 'fields', 'Task ' + this.id + ' is now complete');	
	    this.parent.setChildStatus(this, 'complete');
	}
	this.data = this.select.children[this.select.selectedIndex].value;
	logger.postMessage('INFO', 'fields', 'Option "' + this.data + '" chosen for "' + this.label + '"');

    } // handleChange
    
    /**************************************************************************/

    clearField () {

	this.select.selectedIndex = -1;
	
    } // clearField
    
    /**************************************************************************/
    
} // SelectTask

export default SelectTask;
