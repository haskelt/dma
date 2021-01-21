// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger.js';
import DataError from '/dma/js/errors/DataError.js';
import DataSpecialistFactory from '/dma/js/data/DataSpecialistFactory.js';
import DataSets from '/dma/js/data/DataSets.js';

class DataManager {

    static data = {};
    static dataConfig = {
	'instructor': { 'class': 'Metadata' },
	'institution': { 'class': 'Metadata' },
	'course': { 'class': 'Metadata' },
	'condition': { 'class': 'Metadata' },
	'modality': { 'class': 'Metadata' },
	'term': { 'class': 'Metadata' },
	'_roster': { 'class': 'Roster', 'requiredFields': ["STUDENT'S NAME", 'SID', 'EMAIL'] },
	'demographics': { 'class': 'Canvas', 'headerMappings': {
	    'first time taking this course': 'first_time',
	    'grade you received in Engineering Physics 1': 'phys1_grade',
	    'grade you received in Calculus 2': 'calc2_grade',
	    'your age fall in': 'age',
	    'parents earned a 4-year college degree': 'parent_degree',
	    'gender do you most identify with': 'gender',
	    'best describes your race/ethnicity': 'ethnicity',
	    'Purpose and Benefit': 'consent'
	}, 'requiredFields': ['consent'] },
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
	
	DataSets.applyFilter('demographics', 'consent', 'I give permission to include my responses in this study');
	
    } // finalizeData

    /**************************************************************************/
    
    static exportData () {

	DataSets.exportData('EMARCS Data.xlsx');
	
    } // exportData
    
    /**************************************************************************/
    
}

export default DataManager;