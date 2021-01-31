// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js?v=0.1.2-beta';
import FieldTask from '/js/fields/FieldTask.js?v=0.1.2-beta';
import xlsx from '/js/xlsx/xlsx.js?v=0.1.2-beta';

class SpreadsheetSelectorTask extends FieldTask {
    
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
		xlsx.read(this.input.files[0], this.fileReadCallback.bind(this));
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

    clearField () {

	this.input.value = null;
	
    } // clearField
    
    /**************************************************************************/
    
} // SpreadsheetSelectorTask

export default SpreadsheetSelectorTask;