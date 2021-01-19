// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger.js';
import DataSpecialistFactory from '/dma/js/data/DataSpecialistFactory.js';
import DataSets from '/dma/js/data/DataSets.js';

class DataManager {

    static data = {};
    static dataConfig = {
	'instructor': { 'class': 'Metadata' },
	'institution': { 'class': 'Metadata' },
	'course': { 'class': 'Metadata' },
	'condition': { 'class': 'Metadata' },
	'_roster': { 'class': 'Roster', 'requiredFields': ["Student's Name", 'SID', 'Email'] },
	'demographics': { 'class': 'Canvas', 'requiredFields': ['117284167:'] },
	'mct_pre': { 'class': 'Canvas' },
	'mct_post': { 'class': 'Canvas' },
	'cw': { 'class': 'CW' },
	'exam': { 'class': 'Exam' }
    };
    
    /**************************************************************************/

    static postData (tag, data) {

	logger.postMessage('DEBUG', 'data', 'Posting data for tag ' + tag + ' of ' + data);
	if(tag in this.dataConfig){
	    let specialist = DataSpecialistFactory.build(this.dataConfig[tag]['class']);
	    specialist.processData.bind(specialist)(tag, data, this.dataConfig[tag]);
	} else {
	    throw Error('No data handling configured for ' + tag);
	}
	
    } // postData
    
    /**************************************************************************/

    static finalizeData () {

	var metadata = DataSets.getDataSet('_meta');
	var ids = DataSets.getDataField('_roster', 'anonID');
	var courseInfo = [];
	for(let id of ids){
	    let row = { 'anonID': id };
	    for(let field in metadata){
		row[field] = metadata[field];
	    }
	    courseInfo.push(row);
	}
	DataSets.setDataSet('course_info', courseInfo);
	
	DataSets.applyFilter('demographics', '117284167:', 'I give permission to include my responses in this study');
	
    } // finalizeData

    /**************************************************************************/
    
    static exportData () {

	DataSets.exportData('EMARCS Data.xlsx');
	
    } // exportData
    
    /**************************************************************************/
    
}

export default DataManager;