{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{ SITE_PATH }}/js/logger.js';
import TaskHierarchyObject from '{{ SITE_PATH }}/js/tasks/TaskHierarchyObject.js';
import DataManager from '{{ SITE_PATH }}/js/data/DataManager.js';

class FileSelectorObject extends TaskHierarchyObject {
    
/*****************************************************************************/

    constructor (element) {

	super(element);
	this.input = element.querySelector('.fields__file-selector--input');
	this.input.addEventListener('change', this.handleChange.bind(this));
	
    } // constructor
    
/*****************************************************************************/

    handleChange (e) {

	logger.postMessage('DEBUG', 'fields', 'Content of file selector ' + this.id + ' has changed to ' + this.input.value);	
	this.parent.setChildStatus(this, this.input.value == '' ? 'incomplete' : 'complete');

    } // handleChange
    
/*****************************************************************************/

    wrapup () {

	DataManager.postData(this.id, this.input.value);
	
    } // wrapup
    
/*****************************************************************************/
    
} // FileSelectorObject

export default FileSelectorObject;