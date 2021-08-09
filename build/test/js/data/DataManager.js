// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger/logger.js?v=0.18.0-beta';
import config from '/js/config.js?v=0.18.0-beta';
import DataError from '/js/errors/DataError.js?v=0.18.0-beta';
import DataSpecialistFactory from '/js/data/DataSpecialistFactory.js?v=0.18.0-beta';
import DataSets from '/js/data/DataSets.js?v=0.18.0-beta';

class DataManager {

    static data = {};
    static dataConfig = {};
    static consentOptions = {};

    /**************************************************************************/

    static initialize () {

	this.identifiers = config.getConfig('identifiers');
	this.dataConfigSection = config.getConfig('data');
	this.consentOptions = config.getConfig('consentOptions');
	
    } // initialize
    
    /**************************************************************************/

    static postData (tag, data) {

	logger.postMessage('DEBUG', 'data', 'Posting data for tag ' + tag + ' of ' + data);
	if(tag in this.dataConfigSection){
	    let specialist = DataSpecialistFactory.build(this.dataConfigSection[tag]['class']);
	    specialist.processData.bind(specialist)(tag, data, this.dataConfigSection[tag]);
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
    
    static checkConsent (dataSets) {

	var demographicsDataSet = DataSets.getDataSet('demographics');
	var filteredDataSets = {};
	for(let targetTag in dataSets){
	    /* a tag beginning with '@' indicates data for
	       internal use that may or may not have an 'anonID'
	       field, so we don't generate missing records in that
	       case */
	    if(!targetTag.startsWith('@')){
		logger.postMessage('DEBUG', 'data', 'Removing students from "' + targetTag + '" who do not meet the consent criteria');
		filteredDataSets[targetTag] = DataSets.applyFilterSet(dataSets[targetTag], demographicsDataSet, 'anonID', this.consentOptions);
	    }
	}
	return filteredDataSets;
	
    } // checkConsent

    /**************************************************************************/

    static generateMissingRecords (dataSets) {

	var canonicalIdentifier = this.dataConfigSection['_roster']['canonicalIdentifier'];
	var noMissingRecordsDataSets = {};
	for(let targetTag in dataSets){
	    logger.postMessage('DEBUG', 'data', 'Ensuring dataset "' + targetTag + '" contains records for each student in dataset "_roster"');
	    let missingList = [];
	    noMissingRecordsDataSets[targetTag] = DataSets.generateMissingRecords(dataSets[targetTag], dataSets['_roster'], 'anonID', missingList);
	    for(let student of missingList){
		let canonicalID = DataSets.findData('_roster', 'anonID', student, canonicalIdentifier);
		logger.postMessage('WARN', 'data', 'Data set "' + targetTag + '" is missing student "' + canonicalID + '", created empty record.');
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
	var consentedDataSets = this.checkConsent(rawDataSets);
	var noMissingRecordsDataSets = this.generateMissingRecords(consentedDataSets);
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