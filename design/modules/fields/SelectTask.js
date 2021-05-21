{{globals.js_copyright_notice}}

import logger from '{{globals.site_path}}/js/logger/logger.js?v={{globals.version}}';
import FieldTask from '{{globals.site_path}}/js/fields/FieldTask.js?v={{globals.version}}';

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
