// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger/logger.js?v=0.9.0-beta';
import DataSets from '/js/data/DataSets.js?v=0.9.0-beta';

class CourseInfoSpecialist {

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
    
} // CourseInfoSpecialist

export default CourseInfoSpecialist;