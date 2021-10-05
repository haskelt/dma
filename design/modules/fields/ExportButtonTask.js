{{globals.js_copyright_notice}}

import logger from '../logger/logger.js?v={{globals.version}}';
import Task from '../tasks/Task.js?v={{globals.version}}';
import DataManager from '../data/DataManager.js?v={{globals.version}}';

class ExportButtonTask extends Task {
    
    /**************************************************************************/

    constructor (element) {

	super(element);
	this.button = element.querySelector('.fields__export-button--button');
	this.button.addEventListener('click', this.handleClick.bind(this));
	
    } // constructor
    
    /**************************************************************************/

    setup () {

	logger.postMessage('TRACE', 'fields', 'Enabling export button');
	this.button.disabled = false;;
	
    } // setup

    /**************************************************************************/
    
    handleClick (e) {

	DataManager.exportData();
	logger.postMessage('INFO', 'fields', 'Exported data');
	
    } // handleClick

    /**************************************************************************/

} // ExportButtonTask

export default ExportButtonTask;
