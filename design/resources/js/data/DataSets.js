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

    static exportData () {

	logger.postMessage('DEBUG', 'data', 'Exporting student data');
	xlsxUtilities.write(this.dataSets);
	
    } // exportData
    
    /**************************************************************************/

} // DataSets

export default DataSets
