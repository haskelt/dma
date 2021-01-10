{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{ SITE_PATH }}/js/logger.js';
import Task from '{{ SITE_PATH }}/js/tasks/Task.js';
import XLSXReader from '{{SITE_PATH}}/js/files/XLSXReader.js';
import DataManager from '{{ SITE_PATH }}/js/data/DataManager.js';

class SpreadsheetSelectorTask extends Task {
    
    /**************************************************************************/

    constructor (element) {

	super(element);
	this.input = element.querySelector('.fields__spreadsheet-selector--input');
	this.input.addEventListener('change', this.handleChange.bind(this));
	
    } // constructor
    
    /**************************************************************************/

    handleChange (e) {

	logger.postMessage('DEBUG', 'fields', 'Content of spreadsheet selector ' + this.id + ' has changed to ' + this.input.value);
	// if a file has been selected
        if (this.input.files.length > 0) {
	    let excelRegex = /(.xls|.xlsx|.csv)$/;
	    if(excelRegex.test(this.input.files[0].name.toLowerCase())) {
		new XLSXReader().read(this.input.files[0], this.fileReadCallback.bind(this));
	    } else {
		alert('Please choose an Excel or CSV file');
		this.input.value = null;
	    }
	} else {
	    this.parent.setChildStatus(this, 'incomplete');
	}

    } // handleChange

    /**************************************************************************/

    fileReadCallback (data) {

	if(data == null){
	    alert('Error while parsing the selected file; please verify that it is in the correct format.');
	    this.input.value = null;
	} else {
	    this.data = data;
	    this.parent.setChildStatus(this, 'complete');
	}
	
    } // fileReadCallback
    
    /**************************************************************************/

    wrapUp () {

	DataManager.postData(this.id, this.data);
	
    } // wrapUp
    
    /**************************************************************************/
    
} // SpreadsheetSelectorTask

export default SpreadsheetSelectorTask;
