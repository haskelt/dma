{{ JS_COPYRIGHT_NOTICE }}
import logger from '{{ SITE_PATH }}/js/logger.js';
import TaskHierarchyObject from '{{ SITE_PATH }}/js/tasks/TaskHierarchyObject.js';
import DataManager from '{{ SITE_PATH }}/js/data/DataManager.js';

class TextInputObject extends TaskHierarchyObject {
    
/*****************************************************************************/

    constructor (element) {

	super(element);
	this.input = element.querySelector('.fields__text-input--input');
	this.input.addEventListener('input', this.handleInput.bind(this));
	this.hasContent = false;
	
    } // constructor
    
/*****************************************************************************/

    handleInput (e) {

	console.log('got input');
	var newHasContent = (this.input.value != '');
	if(newHasContent != this.hasContent){
	    this.hasContent = newHasContent;
	    logger.postMessage('DEBUG', 'fields', 'Content of text input ' + this.id + ' has changed to ' + this.input.value);	
	    this.parent.setChildStatus(this, this.hasContent ? 'complete' : 'incomplete');
	}

    } // handleInput
    
/*****************************************************************************/

    wrapup () {

	DataManager.postData(this.id, this.input.value);
	
    } // wrapup
    
/*****************************************************************************/
    
} // TextInputObject

export default TextInputObject;
