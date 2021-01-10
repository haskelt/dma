// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';
import Task from '/js/tasks/Task.js';
import XLSXReader from '/js/files/XLSXReader.js';
import CSVReader from '/js/files/CSVReader.js';
import DataManager from '/js/data/DataManager.js';

class FileSelectorTask extends Task {
    
    /**************************************************************************/

    constructor (element) {

	super(element);
	this.input = element.querySelector('.fields__file-selector--input');
	this.input.addEventListener('change', this.handleChange.bind(this));
	
    } // constructor
    
    /**************************************************************************/

    handleChange (e) {

	logger.postMessage('DEBUG', 'fields', 'Content of file selector ' + this.id + ' has changed to ' + this.input.value);
	// if a file has been selected
        if (this.input.files.length > 0) {
	    let excelRegex = /(.xls|.xlsx|.csv)$/;
	    let csvRegex = /.csv$/;
	    if(excelRegex.test(this.input.files[0].name.toLowerCase())) {
		new XLSXReader().read(this.input.files[0], this.fileReadCallback.bind(this));
	    } else if(csvRegex.test(this.input.files[0].name.toLowerCase())){
		new CSVReader().read(this.input.files[0], this.fileReadCallback.bind(this));
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
    
} // FileSelectorTask

export default FileSelectorTask;