{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{ SITE_PATH }}/js/logger/logger.js?v={{VERSION}}';
import FieldTask from '{{ SITE_PATH }}/js/fields/FieldTask.js?v={{VERSION}}';

class MultipleChoiceTask extends FieldTask {
    
    /**************************************************************************/

    constructor (element) {

	super(element);
	this.options = element.querySelectorAll('.fields__multiple-choice--option');
	for(let option of this.options){
	    option.addEventListener('input', this.handleInput.bind(this));
	}
	
    } // constructor
    
    /**************************************************************************/

    handleInput (e) {

	var newHasContent = false;
	for(let option of this.options){
	    if(option.checked){
		newHasContent = true;
		this.data = option.value;
	    }
	}
	if(newHasContent != this.hasContent){
	    this.hasContent = newHasContent;
	    logger.postMessage('DEBUG', 'fields', 'Multiple choice option has been selected for ' + this.id);	
	    this.parent.setChildStatus(this, this.hasContent ? 'complete' : 'incomplete');
	}

    } // handleInput
    
    /**************************************************************************/

    clearField () {

	for(let option of this.options){
	    if(option.checked){
		option.checked = false;
	    }
	}
	
    } // clearField
    
    /**************************************************************************/
    
} // MultipleChoiceTask

export default MultipleChoiceTask;
