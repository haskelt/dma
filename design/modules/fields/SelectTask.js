{{globals.js_copyright_notice}}

import logger from '../logger/logger.js?v={{globals.version}}';
import FieldTask from './FieldTask.js?v={{globals.version}}';

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
	    this.setComplete(true);
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
