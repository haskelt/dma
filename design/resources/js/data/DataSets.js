{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{SITE_PATH}}/js/logger.js';
import xlsxUtilities from '{{SITE_PATH}}/js/files/xlsxUtilities.js';

class DataSets {

    static dataSets = {};

    /**************************************************************************/

    static setDataSet (tag, data) {

	this.dataSets[tag] = data;
	
    } // getDataSet

    /**************************************************************************/
    
    static getDataSet (tag) {

	return this.dataSets[tag];

    } // getDataSet
    
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
	    this.dataSets[tag] = this.dataSets[tag].filter(entry => keepList.includes(entry['anonID']));
	}
	
    } // applyFilter

    /**************************************************************************/

    static findData (searchTag, searchField, searchValue, returnField) {
	/* In the data set <searchTag>, look through the values of
	   <searchField> for the first match with <searchValue>. If
	   found, return the value of <returnField> from the same
	   row. Returns null if no match is found. */

	logger.postMessage('DEBUG', 'data', 'Looking up value of ' + returnField + ' for record of ' + searchTag + ' where ' + searchField + ' is ' + searchValue);
	for(let row of this.dataSets[searchTag]){
	    if(row[searchField] == searchValue){
		return row[returnField];
	    }
	}
	return null;   
	
    } // findData
    
    /**************************************************************************/
    
    static exportData () {

	logger.postMessage('DEBUG', 'data', 'Exporting student data');
	var exportableDataSets = {};
	for(let tag in this.dataSets){
	    /* a tag beginning with '_' indicates data that should not
	       be exported */
	    if(!tag.startsWith('_')){
		exportableDataSets[tag] = this.dataSets[tag];
	    }
	}
	xlsxUtilities.write(exportableDataSets);
	
    } // exportData
    
    /**************************************************************************/

} // DataSets

export default DataSets
