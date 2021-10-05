/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import logger from '../logger/logger.js?v=0.24.2-beta';
import Task from '../tasks/Task.js?v=0.24.2-beta';
import DataManager from '../data/DataManager.js?v=0.24.2-beta';

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