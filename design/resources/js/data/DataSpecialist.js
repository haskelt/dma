{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{SITE_PATH}}/js/logger.js';
import DataSets from '{{SITE_PATH}}/js/data/DataSets.js';
import xlsx from '{{SITE_PATH}}/js/xlsx/xlsx.js';

class DataSpecialist {

    /**************************************************************************/
    
    constructor () {

	this.processingSteps = [];
	
    } // constructor
    
    /**************************************************************************/

    setData (tag, data, requiredFields) {

	logger.postMessage('DEBUG', 'data', 'Setting student data ' + tag);

	this.curData = data;
	this.requiredFields = requiredFields;

	for(let step of this.processingSteps){
	    step.bind(this)();
	}

	var sheetNames = Object.keys(this.curData);
	if(sheetNames.length == 1){
	    DataSets.setDataSet(tag, this.curData[sheetNames[0]]);
	} else {
	    for(let sheet of sheetNames){
		DataSets.setDataSet(tag + '.' + sheet, this.curData[sheet]);
	    }
	}
	
    } // setData
    
    /**************************************************************************/
    
    convertWorkbookToJSON () {
	/* Convert the data from a workbook object to a JSON object */
	
	var JSONData = {};
	for(let sheet in this.curData.Sheets){
	    console.log(sheet);
	    JSONData[sheet] = xlsx.sheetToJSON(this.curData.Sheets[sheet]);
	}
	this.curData = JSONData;
	
    } // convertWorkbookToJSON
    
    /**************************************************************************/

    doSingleWorksheetCheck () {
	/* Check that there's only one worksheet */

	console.log(Object.keys(this.curData));
	if(Object.keys(this.curData).length != 1){
	    throw Error('Data file can only have one worksheet. Please fix and then reupload the file.');
	}

    } // doSingleWorksheetcheck

    /**************************************************************************/

    doRequiredFieldsCheck () {
	/* Check that any required fields are present */
	
	for(let field of this.requiredFields){
	    for(let sheet in this.curData){
		if(!(field in this.curData[sheet][0])){
		    throw Error('A column for ' + field + ' is required. Please fix and then reupload the file.');
		}
	    }
	}
	    
    } // doRequiredFieldsCheck

    /**************************************************************************/
    
} // DataSpecialist

export default DataSpecialist;