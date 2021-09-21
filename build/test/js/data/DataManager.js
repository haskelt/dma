// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger/logger.js?v=0.21.2-beta';
import config from '/js/config.js?v=0.21.2-beta';
import DataError from '/js/errors/DataError.js?v=0.21.2-beta';
import DataSpecialistFactory from '/js/data/DataSpecialistFactory.js?v=0.21.2-beta';
import '/js/data/MetadataSpecialist.js?v=0.21.2-beta';
import DataSets from '/js/data/DataSets.js?v=0.21.2-beta';

class DataManager {

    static data = {};
    static dataConfig = {};
    static consentOptions = {};

    /*************************************************************************/

    static initialize () {

	this.identifiers = config.getConfig('identifiers');
	this.dataConfigSection = config.getConfig('data');
	this.consentOptions = config.getConfig('consentOptions');
	
    } // initialize
    
    /*************************************************************************/

    static postData (tag, data) {

	logger.postMessage('DEBUG', 'data', 'Posting data for tag ' + tag + ' of ' + data);
	console.log(this.dataConfigSection);
	if(tag in this.dataConfigSection){
	    let specialist = DataSpecialistFactory.build(this.dataConfigSection[tag]['class']);
	    specialist.processData.bind(specialist)(tag, data, this.dataConfigSection[tag]);
	} else {
	    throw Error('No data handling configured for ' + tag);
	}
	
    } // postData
    
    /*************************************************************************/

    static buildCourseInfoData () {
	
    	var metadata = DataSets.getDataSet('@meta');
	var ids = DataSets.getDataField('@roster', 'anonID');
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
    
    /*************************************************************************/

    static checkConsent (targetTag) {

	logger.postMessage('DEBUG', 'data', 'Removing students from "' + targetTag + '" who do not meet the consent criteria');
	var demographicsDataSet = DataSets.getDataSet('demographics');
	var targetDataSet = DataSets.getDataSet(targetTag);
	var filteredDataSet = DataSets.applyFilterSet(targetDataSet, demographicsDataSet, 'anonID', this.consentOptions);
	DataSets.setDataSet(targetTag, filteredDataSet);
	
    } // checkConsent
    
    /*************************************************************************/

    static generateMissingRecords (targetTag) {

	logger.postMessage('DEBUG', 'data', 'Ensuring dataset "' + targetTag + '" contains records for each student in dataset "@roster"');
	var canonicalIdentifier = this.dataConfigSection['@roster']['canonicalIdentifier'];
	var rosterDataSet = DataSets.getDataSet('@roster');
	var targetDataSet = DataSets.getDataSet(targetTag);
	let missingList = [];
	var noMissingRecordsDataSet = DataSets.generateMissingRecords(targetDataSet, rosterDataSet, 'anonID', missingList);
	for(let student of missingList){
	    let canonicalID = DataSets.findData('@roster', 'anonID', student, canonicalIdentifier);
	    logger.postMessage('WARN', 'data', 'Data set "' + targetTag + '" is missing student "' + canonicalID + '", created empty record.');
	}
	DataSets.setDataSet(targetTag, noMissingRecordsDataSet);
	
    } // generateMissingRecords

    /*************************************************************************/

    static sortData (targetTag) {

	logger.postMessage('DEBUG', 'data', 'Sorting dataset "' + targetTag + '"');
	var targetDataSet = DataSets.getDataSet(targetTag);
	var sortedDataSet = DataSets.sortBy(targetDataSet, 'anonID');
	DataSets.setDataSet(targetTag, sortedDataSet);
	
    } // sortData
    
    /*************************************************************************/

    static finalizeData () {

	this.buildCourseInfoData();
	this.checkConsent('@roster');

	this.exportableDataSets = {};
	for(let targetTag of DataSets.getDataTags()){
	    /* a tag beginning with '@' indicates data for internal
	       use that should not be exported */
	    if(!targetTag.startsWith('@')){
		logger.postMessage('DEBUG', 'data', 'Preparing dataset "' + targetTag + '" for export');
		this.checkConsent(targetTag);
		this.generateMissingRecords(targetTag);
		this.sortData(targetTag);
		this.exportableDataSets[targetTag] = DataSets.getDataSet(targetTag);
	    }
	}
	
    } // finalizeData

    /*************************************************************************/
    
    static exportData () {

	DataSets.exportData(this.exportableDataSets, 'EMARCS Data.xlsx');
	
    } // exportData
    
    /*************************************************************************/
    
}

export default DataManager;