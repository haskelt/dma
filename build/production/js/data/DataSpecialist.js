// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger.js';
import DataSets from '/dma/js/data/DataSets.js';
import xlsx from '/dma/js/xlsx/xlsx.js';

class DataSpecialist {

    /**************************************************************************/
    
    constructor () {

	this.headerRow = 0;
	this.processingSteps = [];
	
    } // constructor
    
    /**************************************************************************/

    processData (tag, data, config) {

	logger.postMessage('DEBUG', 'data', 'Setting data ' + tag);

	this.tag = tag;
	this.curData = data;
	this.config = config;

	for(let step of this.processingSteps){
	    step.bind(this)();
	}

	this.setData();
	
    } // processData
    
    /**************************************************************************/
    
    convertWorkbookToJSON () {
	/* Convert the data from a workbook object to a JSON object */
	
	var JSONData = {};
	for(let sheet in this.curData.Sheets){
	    JSONData[sheet] = xlsx.sheetToJSON(this.curData.Sheets[sheet], {range: this.headerRow});
	}
	this.curData = JSONData;
	
    } // convertWorkbookToJSON
    
    /**************************************************************************/

    doSingleWorksheetCheck () {
	/* Check that there's only one worksheet */

	if(Object.keys(this.curData).length != 1){
	    throw Error('Data file can only have one worksheet. Please fix and then reupload the file.');
	}

    } // doSingleWorksheetcheck

    /**************************************************************************/

    doRequiredFieldsCheck () {
	/* Check that any required fields are present */

	if('requiredFields' in this.config){
	    for(let field of this.config.requiredFields){
		for(let sheet in this.curData){
		    if(!(field in this.curData[sheet][0])){
			throw Error('A column for ' + field + ' is required. Please fix and then reupload the file.');
		    }
		}
	    }
	}
	    
    } // doRequiredFieldsCheck

    /**************************************************************************/

    setData () {
	
    	var sheetNames = Object.keys(this.curData);
	if(sheetNames.length == 1){
	    DataSets.setDataSet(this.tag, this.curData[sheetNames[0]]);
	} else {
	    for(let sheet of sheetNames){
		DataSets.setDataSet(this.tag + '.' + sheet, this.curData[sheet]);
	    }
	}

    } // setData

    /**************************************************************************/

} // DataSpecialist

export default DataSpecialist;