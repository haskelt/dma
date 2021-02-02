// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger/logger.js?v=0.6.0-beta';
import DataError from '/js/errors/DataError.js?v=0.6.0-beta';
import DataSpecialistFactory from '/js/data/DataSpecialistFactory.js?v=0.6.0-beta';
import DataSets from '/js/data/DataSets.js?v=0.6.0-beta';

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

    static buildCourseInfoData () {
	
    	var metadata = DataSets.getDataSet('@meta');
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

    } // buildCourseInfoData
    
    /**************************************************************************/
    
    static filterData (dataSets) {

	var demographicsDataSet = DataSets.getDataSet('demographics');
	var filteredDataSets = {};
	for(let targetTag in dataSets){
	    /* a tag beginning with '@' indicates data for
	       internal use that may or may not have an 'anonID'
	       field, so we don't generate missing records in that
	       case */
	    if(!targetTag.startsWith('@')){
		logger.postMessage('DEBUG', 'data', 'Removing students from "' + targetTag + '" where field "consent" of dataset "demographics" is not "I give permission to include my responses in this study"');
		filteredDataSets[targetTag] = DataSets.applyFilter(dataSets[targetTag], demographicsDataSet, 'anonID', 'consent', 'I give permission to include my responses in this study');
	    }
	}
	return filteredDataSets;
	
    } // filterData

    /**************************************************************************/

    static generateMissingRecords (dataSets) {

	var noMissingRecordsDataSets = {};
	for(let targetTag in dataSets){
	    logger.postMessage('DEBUG', 'data', 'Ensuring dataset "' + targetTag + '" contains records for each student in dataset "_roster"');
	    let missingList = [];
	    noMissingRecordsDataSets[targetTag] = DataSets.generateMissingRecords(dataSets[targetTag], dataSets['_roster'], 'anonID', missingList);
	    for(let student of missingList){
		let name = DataSets.findData('_roster', 'anonID', student, "STUDENT'S NAME");
		logger.postMessage('WARN', 'data', 'Data set "' + targetTag + '" is missing student "' + name + '", created empty record.');
	    }
	    logger.postMessage('DEBUG', 'data', 'Sorting dataset "' + targetTag + '" by field "anonID"');
	}
	return noMissingRecordsDataSets;
	
    } // generateMissingRecords

    /**************************************************************************/

    static sortData (dataSets) {
	
	var sortedDataSets = {};
	for(let targetTag in dataSets){
	    logger.postMessage('DEBUG', 'data', 'Sorting dataset "' + targetTag + '"');
	    sortedDataSets[targetTag] = DataSets.sortBy(dataSets[targetTag], 'anonID');
	}
	return sortedDataSets;
	
    } // sortData
    
    /**************************************************************************/

    static prepareExports (dataSets) {

	var exportableDataSets = {};
	for(let targetTag in dataSets){
	    /* a tag beginning with '_' indicates data that should not
	       be exported */
	    if(!targetTag.startsWith('_')){
		logger.postMessage('DEBUG', 'data', 'Preparing dataset "' + targetTag + '" for export');
		exportableDataSets[targetTag] = dataSets[targetTag];
	    }
	}
	return exportableDataSets;
	
    } // prepareExports
    
    /**************************************************************************/
    
    static finalizeData () {

	this.buildCourseInfoData();

	var rawDataSets = {};
	for(let targetTag of DataSets.getDataTags()){
	    /* a tag beginning with '@' indicates data for internal
	       use that should not be processed in the usual way */
	    if(!targetTag.startsWith('@')){
		rawDataSets[targetTag] = DataSets.getDataSet(targetTag);
	    }
	}
	var filteredDataSets = this.filterData(rawDataSets);
	var noMissingRecordsDataSets = this.generateMissingRecords(filteredDataSets);
	var sortedDataSets = this.sortData(noMissingRecordsDataSets);
	this.exportableDataSets = this.prepareExports(sortedDataSets);
	
    } // finalizeData

    /**************************************************************************/
    
    static exportData () {

	DataSets.exportData(this.exportableDataSets, 'EMARCS Data.xlsx');
	
    } // exportData
    
    /**************************************************************************/
    
}

export default DataManager;