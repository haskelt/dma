// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger.js';
import DataWarning from '/dma/js/errors/DataWarning.js';
import xlsx from '/dma/js/xlsx/xlsx.js';

class DataSets {

    static dataSets = {};

    /**************************************************************************/

    static setDataSet (tag, data) {

	this.dataSets[tag] = data;
	
    } // getDataSet

    /**************************************************************************/

    static getDataSet (tag) {

	if(tag in this.dataSets){
	    return this.dataSets[tag];
	} else {
	    return null;
	}

    } // getDataSet
    
    /**************************************************************************/

    static getDataField (tag, field) {

	let values = [];
	for(let row of this.dataSets[tag]){
	    values.push(row[field]);
	}
	return values;

    } // getDataField

    /**************************************************************************/

    static generateMissingRecords (referenceTag) {
	/* Goes through all the datasets and ensures that they contain
	   a record for each student in the <referenceTag> dataset,
	   creating that record if necessary */
	
	logger.postMessage('DEBUG', 'data', 'Coordinating data: Ensuring all datasets contain records for each student in dataset "' + referenceTag + '"');
	for(let referenceRecord of this.dataSets[referenceTag]){
	    for(let targetTag in this.dataSets){
		/* a tag beginning with '_' indicates data for
		   internal use that may or may not have an 'anonID'
		   field, so we don't generate missing records in that
		   case */
		if(targetTag != referenceTag && !targetTag.startsWith('_')){
		    if(!this.dataSets[targetTag].find(entry => entry['anonID'] == referenceRecord['anonID'])){
			this.dataSets[targetTag].push({ anonID: referenceRecord['anonID'] });	
		    }
		}
	    }
	}
	
    } // generateMissingRecords 

    /**************************************************************************/

    static sortBy (field) {

	logger.postMessage('DEBUG', 'data', 'Sorting datasets by field "' + field + '"');
	for(let tag in this.dataSets){
	    /* a tag beginning with '_' indicates data for
	       internal use that may or may not have an 'anonID'
	       field, so we don't sort in that case */
	    if(!tag.startsWith('_')){
		this.dataSets[tag].sort((a, b) => a['anonID'] > b['anonID'] ? 1 : (a['anonID'] < b['anonID'] ? -1 : 0));
	    }
	}
	
    } // sortBy
    
    /**************************************************************************/
    
    static applyFilter (tag, field, value) {
	/* Remove students from the data if the data point indicated by
	   <tag> and <field> is NOT <value> */

	logger.postMessage('DEBUG', 'data', 'Filtering: Keeping students where ' + tag + '::' + field + ' has value ' + value);
	// generate a list of students whose data we are keeping
	var keepList = [];
	for(let row of this.dataSets[tag]){
	    if(row[field] == value){
		keepList.push(row['anonID']);
	    }
	}
	/* go through all the datasets and gather data rows for only
	   students who are in the list */
	for(let tag in this.dataSets){
	    /* a tag beginning with '_' indicates data for internal use that
	       may or may not have an 'anonID' field, so we don't filter it */
	    if(!tag.startsWith('_')){
		this.dataSets[tag] = this.dataSets[tag].filter(entry => keepList.includes(entry['anonID']));
	    }
	}
	
    } // applyFilter

    /**************************************************************************/

    static findData (searchTag, searchField, searchValue, returnField) {
	/* In the data set <searchTag>, look through the values of
	   <searchField> for the first match with <searchValue>. If
	   found, return the value of <returnField> from the same
	   row. Returns null if no match is found. */

	logger.postMessage('TRACE', 'data', 'Looking up value of ' + returnField + ' for record of ' + searchTag + ' where ' + searchField + ' is ' + searchValue);
	for(let row of this.dataSets[searchTag]){
	    if(row[searchField] == searchValue){
		return row[returnField];
	    }
	}
	throw new DataWarning('Unable to find record of "' + searchTag + '" where "' + searchField + '" is "' + searchValue + '"');
	
    } // findData
    
    /**************************************************************************/
    
    static exportData (file) {

	logger.postMessage('DEBUG', 'data', 'Exporting student data');
	var exportableDataSets = {};
	for(let tag in this.dataSets){
	    /* a tag beginning with '_' indicates data that should not
	       be exported */
	    if(!tag.startsWith('_')){
		exportableDataSets[tag] = this.dataSets[tag];
	    }
	}
	xlsx.write(exportableDataSets, file);
	
    } // exportData
    
    /**************************************************************************/

} // DataSets

export default DataSets