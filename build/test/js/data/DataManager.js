// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';
import Roster from '/js/data/Roster.js';
import StudentData from '/js/data/StudentData.js';
import CWData from '/js/data/CWData.js';
import DataSets from '/js/data/DataSets.js';

class DataManager {

    static data = {};
    static dataConfig = {
	'roster': { 'dataClass': Roster, 'requiredFields': ['Name', 'ID', 'E-mail'] },
	'demographics': { 'dataClass': StudentData, 'requiredFields': ['117284167:'] },
	'mct_pre': { 'dataClass': StudentData, 'requiredFields': [] },
	'mct_post': { 'dataClass': StudentData, 'requiredFields': [] },
	'trcv': { 'dataClass': CWData, 'requiredFields': [] }
    };
    static dataValidityFlag = false;
    
    /**************************************************************************/

    static postData (tag, data) {

	logger.postMessage('DEBUG', 'data', 'Posting data for tag ' + tag + ' of ' + data);
	if(tag in this.dataConfig){
	    let dataClass = this.dataConfig[tag]['dataClass'];
	    let settingObject = new dataClass();
	    let settingFunction = settingObject.setData.bind(settingObject);
	    settingFunction(tag, data, this.dataConfig[tag]['requiredFields']);
	} else {
	    this.data[tag] = data;
	    //throw Error('No data handling configured for ' + tag);
	}
	
    } // postData
    
    /**************************************************************************/

    static validateData () {

	try {
	    DataSets.applyFilter('demographics', '117284167:', 'I give permission to include my responses in this study');
	    this.dataValidityFlag = true;
	}
	catch (error) {
	    alert(error.message);
	}
	
    } // validateData

    /**************************************************************************/
    
    static dataIsValid () {

	return this.dataValidityFlag;

    } // isDataValid
    
    /**************************************************************************/
    
    static exportData () {

	DataSets.exportData();
	
    } // exportData
    
    /**************************************************************************/
    
}

export default DataManager;