{{globals.js_copyright_notice}}

import logger from '{{globals.site_path}}/js/logger/logger.js?v={{globals.version}}';
import FieldTask from '{{globals.site_path}}/js/fields/FieldTask.js?v={{globals.version}}';

class TextInputTask extends FieldTask {
    
    /**************************************************************************/

    constructor (element) {

	super(element);
	this.input = element.querySelector('.fields__text-input--input');
	this.input.addEventListener('input', this.handleInput.bind(this));
	this.input.addEventListener('blur', this.handleBlur.bind(this));
	this.hasContent = false;
	this.hasChanged = false;
	this.data = null;
	
    } // constructor
    
    /**************************************************************************/

    handleInput (e) {

	var newHasContent = (this.input.value != '');
	if(!this.hasContent && newHasContent){
	    logger.postMessage('DEBUG', 'fields', 'Task "' + this.id + '" is now complete');
	    this.hasContent = true;
	    this.parent.setChildStatus(this, 'complete');
	} else if(this.hasContent && !newHasContent){
	    logger.postMessage('DEBUG', 'fields', 'Task "' + this.id + '" is now incomplete');
	    this.hasContent = false;
	    this.parent.setChildStatus(this, 'incomplete');
	}
	this.hasChanged = true;
	this.data = this.input.value;

    } // handleInput
    
    /**************************************************************************/

    handleBlur (e) {

	if(this.hasChanged){
	    this.hasChanged = false;
	    logger.postMessage('INFO', 'fields', 'Text "' +this.data + '" entered for "' + this.label + '"');
	}

    } // handleBlur
    
    /**************************************************************************/
    
    clearField () {

	this.input.value = '';
	
    } // clearField

    /**************************************************************************/
    
} // TextInputTask

export default TextInputTask;
