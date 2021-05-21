{{globals.js_copyright_notice}}

import logger from '{{globals.site_path}}/js/logger/logger.js?v={{globals.version}}';
import FieldTask from '{{globals.site_path}}/js/fields/FieldTask.js?v={{globals.version}}';

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
		logger.postMessage('INFO', 'fields', 'Option "' + this.data + '" chosen for "' + this.label + '"');
	    }
	}
	if(newHasContent != this.hasContent){
	    this.hasContent = newHasContent;
	    logger.postMessage('DEBUG', 'fields', 'Task ' + this.id + ' is now complete');	
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
