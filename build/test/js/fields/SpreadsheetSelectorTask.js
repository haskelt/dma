// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger/logger.js?v=0.15.0-beta';
import FieldTask from '/js/fields/FieldTask.js?v=0.15.0-beta';
import xlsx from '/js/xlsx/xlsx.js?v=0.15.0-beta';

class SpreadsheetSelectorTask extends FieldTask {
    
    /**************************************************************************/

    constructor (element) {

	super(element);
	this.selector = element.querySelector('.fields__spreadsheet-selector--selector');
	this.selector.addEventListener('change', this.handleSelector.bind(this));
	if(element.dataset.optional == 'true'){
	    this.checkbox = element.querySelector('.fields__spreadsheet-selector--checkbox');
	    this.checkbox.addEventListener('change', this.handleCheckbox.bind(this));
	}
	
    } // constructor
    
    /**************************************************************************/

    handleSelector (e) {

	logger.postMessage('DEBUG', 'fields', 'Content of spreadsheet selector ' + this.id + ' has changed to ' + this.selector.value);
	// if a file has been selected
        if (this.selector.files.length > 0) {
	    let excelRegex = /(.xls|.xlsx|.csv)$/;
	    if(excelRegex.test(this.selector.files[0].name.toLowerCase())) {
		xlsx.read(this.selector.files[0], this.fileReadCallback.bind(this));
	    } else {
		logger.postMessage('ERROR', 'fields', 'Please choose an Excel or CSV file', 'error');
		this.selector.value = null;
	    }
	} else {
	    this.parent.setChildStatus(this, 'incomplete');
	}

    } // handleSelector

    /**************************************************************************/

    fileReadCallback (data) {

	if(data == null){
	    logger.postMessage('ERROR', 'fields', 'Error while parsing the selected file; please verify that it is in the correct format.');
	    this.selector.value = null;
	} else {
	    this.data = data;
	    let filenameRegex = /[^\\/]+$/;
	    let filename = this.selector.value.match(filenameRegex);
	    logger.postMessage('INFO', 'fields', 'File "' + filename + '" chosen for "' + this.label + '"');
	    this.parent.setChildStatus(this, 'complete');
	}
	
    } // fileReadCallback
    
    /**************************************************************************/

    handleCheckbox (e) {
	
	if(this.checkbox.checked){
	    logger.postMessage('INFO', 'fields', 'Choosing to skip "' + this.label + '"');
	    this.selector.value = null;
	    this.data = null;
	    this.selector.disabled = true;
	    this.parent.setChildStatus(this, 'complete');
	} else {
	    logger.postMessage('INFO', 'fields', 'Choosing to select a file for "' + this.label + '"');
	    console.log('unchecked the checkbox');
	    this.selector.disabled = false;
	    this.parent.setChildStatus(this, 'incomplete');
	}
	
    } // handleCheckbox

    /**************************************************************************/

    clearField () {

	this.selector.value = null;
	
    } // clearField
    
    /**************************************************************************/
    
} // SpreadsheetSelectorTask

export default SpreadsheetSelectorTask;