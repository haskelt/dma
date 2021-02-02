{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{SITE_PATH}}/js/logger/logger.js?v={{VERSION}}';
import FieldTask from '{{SITE_PATH}}/js/fields/FieldTask.js?v={{VERSION}}';
import xlsx from '{{SITE_PATH}}/js/xlsx/xlsx.js?v={{VERSION}}';

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
		logger.postMessage('ERROR', 'fields', 'Please choose an Excel or CSV file', 'error');
		this.input.value = null;
	    }
	} else {
	    this.parent.setChildStatus(this, 'incomplete');
	}

    } // handleChange

    /**************************************************************************/

    fileReadCallback (data) {

	if(data == null){
	    logger.postMessage('ERROR', 'fields', 'Error while parsing the selected file; please verify that it is in the correct format.');
	    this.input.value = null;
	} else {
	    this.data = data;
	    let filenameRegex = /[^\\/]+$/;
	    let filename = this.input.value.match(filenameRegex);
	    logger.postMessage('INFO', 'fields', 'File "' + filename + '" chosen for "' + this.label + '"');
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
