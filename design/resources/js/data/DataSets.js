{{globals.js_copyright_notice}}

import logger from '{{globals.site_path}}/js/logger/logger.js?v={{globals.version}}';
import DataError from '{{globals.site_path}}/js/errors/DataError.js?v={{globals.version}}';
import DataWarning from '{{globals.site_path}}/js/errors/DataWarning.js?v={{globals.version}}';
import xlsx from '{{globals.site_path}}/js/xlsx/xlsx.js?v={{globals.version}}';

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

    static getDataTags () {

	return Object.keys(this.dataSets);
	
    } // getDataTags
    
    /**************************************************************************/

    static getDataSetFields (tag) {

	if(tag in this.dataSets){
	    return Object.keys(this.dataSets[tag][0]);
	} else {
	    return null;
	}

    } // getDataSet

    /**************************************************************************/

    static dataFieldExists (tag, field) {

	if(tag in this.dataSets && field in this.dataSets[tag][0]){
	    return true;
	} else {
	    return false;
	}
	
    } // dataFieldExists
    
    /**************************************************************************/

    static getDataField (tag, field) {

	let values = [];
	for(let row of this.dataSets[tag]){
	    values.push(row[field]);
	}
	return values;

    } // getDataField

    /**************************************************************************/

    static generateMissingRecords (targetDataSet, referenceDataSet, matchField, missingList) {
	/* Goes through dataset <targetDataSet> and ensures that it
	   contains a record for each student in the
	   <referenceDataSet> dataset based on the contents of the
	   field <matchField>. A new record is created for
	   <targetDataSet> if necessary. Returns the new dataset
	   (original is unmodified), and populates the array
	   <missingList> with the value of <matchField> for each
	   student where a new record is created. */
		
	var newDataSet = [];
	for(let referenceRecord of referenceDataSet){
	    let matchingRecord = targetDataSet.find(entry => entry[matchField] == referenceRecord[matchField]);
	    if(!matchingRecord){
		if(missingList){
		    missingList.push(referenceRecord[matchField]);
		}
		matchingRecord = {};
		matchingRecord[matchField] = referenceRecord[matchField];
	    }
	    newDataSet.push(matchingRecord);
	}
	return newDataSet;
	
    } // generateMissingRecords 

    /**************************************************************************/

    static sortBy (dataSet, field) {

	var newDataSet = Array.from(dataSet)
	newDataSet.sort((a, b) => a[field] > b[field] ? 1 : (a[field] < b[field] ? -1 : 0));
	return newDataSet;
	
    } // sortBy
    
    /**************************************************************************/
    
    static applyFilter (targetDataSet, referenceDataSet, matchField, filterField, value) {
	/* Remove students from <targetDataSet> for whom the value of
	   <field> in <referenceDataSet> is not <value>. Returns a new
	   dataset (original is unmodified). */

	// generate a list of students whose data we are keeping
	var keepList = referenceDataSet.filter(entry => entry[filterField] == value).map(entry => entry[matchField]);
	return targetDataSet.filter(entry => keepList.includes(entry[matchField]));
	
    } // applyFilter

    /**************************************************************************/

    static applyFilterSet (targetDataSet, referenceDataSet, matchField, keepOptions) {
	/* Remove students from <targetDataSet> who meet at least one of the
	   options in <keepOptions> as applied to <referenceDataSet>.
	   <matchField> should be a common field in both data sets, as it is
	   used to map the keep/drop decisions from one to the other. */
	// generate a list of students whose data we are keeping
	var keepList = [];
	for(let entry of referenceDataSet){
	    /* Iterate through each possible option in <keepOptions>.
	     * set. The entry only needs to satisfy the criteria of
	     * one option in order to be kept. */
	    for(let option of keepOptions){
		let criteriaMet = true;
		/* Each option consists of one or more distinct
		   criteria.  A criterion consists of a field, a
		   relation (either '=' or '!='), and a comparison
		   value. Within an option, all criteria must be met 
		   to keep the entry. */
		for(let criterion of option){
		    if(criterion.relation == '='){
			if(entry[criterion.field] != criterion.value){
			    criteriaMet = false;
			    break;
			}
		    } else if(criterion.relation == '!='){
			if(entry[criterion.field] == criterion.value){
			    criteriaMet = false;
			    break;
			}
		    }
		}
		if(criteriaMet){
		    keepList.push(entry[matchField]);
		    break;
		}
	    }
	}
	return targetDataSet.filter(entry => keepList.includes(entry[matchField]));
	
    } // applyFilterSet

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
	return null;
	
    } // findData
    
    /**************************************************************************/

    static partitionDataSet (sourceTag, targetTag, fields) {
	/* Take the fields <fields> from the data set <sourceTag>, and
	   move them to a new data set called <targetTag> */

	// check to make sure all fields are present in the source data set
	for(let field of fields){
	    if(!(field in this.dataSets[sourceTag][0])){
		throw new DataError('Error during data set partition: Field "' + field + '" is not in the source data set');
	    }
	}

	// move the fields
	var targetDataSet = [];
	for(let row of this.dataSets[sourceTag]){
	    let newRow = {'anonID': row['anonID']};
	    for(let field of fields){
		newRow[field] = row[field];
		delete row[field];
	    }
	    targetDataSet.push(newRow);
	}

	this.dataSets[targetTag] = targetDataSet;
	
    } // partitionDataSet

    /**************************************************************************/

    static exportData (dataSets, file) {

	logger.postMessage('DEBUG', 'data', 'Exporting student data');
	xlsx.write(dataSets, file);
	
    } // exportData
    
    /**************************************************************************/

} // DataSets

export default DataSets
