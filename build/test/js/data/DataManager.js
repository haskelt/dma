/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import logger from '../logger/logger.js?v=0.26.0-beta';
import warning_tracker from '../logger/WarningTracker.js?v=0.26.0-beta';
import config from '../config.js?v=0.26.0-beta';
import utilities from '../utilities.js?v=0.26.0-beta';
import DataSpecialistFactory from './DataSpecialistFactory.js?v=0.26.0-beta';
import './MetadataSpecialist.js?v=0.26.0-beta';
import DataSets from './DataSets.js?v=0.26.0-beta';

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

    static checkConsent (dataSet) {

	return DataSets.applyFilterSet(dataSet, this.consentData, 'anonID', this.consentOptions);
	
    } // checkConsent
    
    /*************************************************************************/

    static generateMissingRecords (targetTag) {

	logger.postMessage('DEBUG', 'data', 'Ensuring dataset "' + targetTag + '" contains records for each student in dataset "@roster"');
	var canonicalIdentifier = this.dataConfigSection['@roster']['canonicalIdentifier'];
	let missingList = [];
	this.exportDataSets[targetTag] = DataSets.generateMissingRecords(this.exportDataSets[targetTag], this.rosterData, 'anonID', missingList);
	for(let student of missingList){
	    let canonicalID = DataSets.findData('@roster', 'anonID', student, canonicalIdentifier);
	    let message = `Data set "${targetTag}" is missing student "${canonicalID}", created empty record.`;
	    logger.postMessage('WARN', 'data', message);
	    warning_tracker.postMessage(message);
	}
	
    } // generateMissingRecords

    /*************************************************************************/

    static sortData (targetTag) {

	logger.postMessage('DEBUG', 'data', 'Sorting dataset "' + targetTag + '"');
	this.exportDataSets[targetTag] = DataSets.sortBy(this.exportDataSets[targetTag], 'anonID');
	
    } // sortData
    
    /*************************************************************************/

    static finalizeData () {

	this.buildCourseInfoData();

	this.rosterData = utilities.deepCopy(DataSets.getDataSet('@roster'));
	this.consentData = utilities.deepCopy(DataSets.getDataSet('demographics'));
	this.rosterData = this.checkConsent(this.rosterData);

	this.exportDataSets = {};
	for(let targetTag of DataSets.getDataTags()){
	    /* a tag beginning with '@' indicates data for internal
	       use that should not be exported */
	    if(!targetTag.startsWith('@')){
		logger.postMessage('DEBUG', 'data', 'Preparing dataset "' + targetTag + '" for export');
		this.exportDataSets[targetTag] = utilities.deepCopy(DataSets.getDataSet(targetTag));
		logger.postMessage('DEBUG', 'data', 'Removing students from "' + targetTag + '" who do not meet the consent criteria');
		this.exportDataSets[targetTag] = this.checkConsent(this.exportDataSets[targetTag]);
		this.generateMissingRecords(targetTag);
		this.sortData(targetTag);
	    }
	}
	
    } // finalizeData

    /*************************************************************************/
    
    static exportData () {

	DataSets.exportData(this.exportDataSets, 'EMARCS Data.xlsx');
	
    } // exportData
    
    /*************************************************************************/
    
}

export default DataManager;