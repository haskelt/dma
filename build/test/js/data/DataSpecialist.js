/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import logger from '../logger/logger.js?v=0.24.1-beta';
import config from '../config.js?v=0.24.1-beta';
import utilities from '../utilities.js?v=0.24.1-beta';
import DataError from '../errors/DataError.js?v=0.24.1-beta';
import DataWarning from '../errors/DataWarning.js?v=0.24.1-beta';
import UserInputNeeded from '../errors/UserInputNeeded.js?v=0.24.1-beta';
import errors from '../errors/errors.js?v=0.24.1-beta';
import DataSets from './DataSets.js?v=0.24.1-beta';
import XLSXManager from '../xlsx/XLSXManager.js?v=0.24.1-beta';
import CryptoJS from '../cryptojs/sha256.js?v=0.24.1-beta';
import StudentSelectorDialog from '../dialogs/StudentSelectorDialog.js?v=0.24.1-beta';

class DataSpecialist {

    /**************************************************************************/
    
    constructor () {

	this.headerRow = 0;
	this.processingSteps = [];
	
    } // constructor
    
    /**************************************************************************/

    processData (tag, data, dataConfig) {

	logger.postMessage('DEBUG', 'data', 'Setting data ' + tag);

	this.tag = tag;
	this.rawWorkbook = data;
	/* we make a copy of the raw spreadsheet data rather than
	   modifying the original in case there is an error and we
	   need to reprocess the file */
	this.curData = utilities.deepCopy(data);
	this.dataConfig = dataConfig;
	this.identifiers = config.getConfig('identifiers');
	
	for(let step of this.processingSteps){
	    step.bind(this)();
	}
	
    } // processData
    
    /**************************************************************************/
    
    ensureUniqueHeadings () {

	for(let sheet of Object.values(this.curData.Sheets)){
	    let headingAddresses = {};
	    let sheetRange = XLSXManager.decodeRange(sheet['!ref']);
	    for(let col = sheetRange.s.c; col <= sheetRange.e.c; col++){
		let address = XLSXManager.encodeAddress({c: col, r: this.headerRow});
		if(address in sheet){
		    if(sheet[address].t != 's'){
			sheet[address].t = 's';
			sheet[address].v = sheet[address].v.toString();
			sheet[address].w = undefined;
		    }
		    if(sheet[address].v in headingAddresses){
			headingAddresses[sheet[address].v].push(address);
		    } else {
			headingAddresses[sheet[address].v] = [ address ];
		    }
		}
	    }
	    for(let heading in headingAddresses){
		if(headingAddresses[heading].length > 1){
		    for(let i in headingAddresses[heading]){
			sheet[headingAddresses[heading][i]].v += '_' + i.toString();
		    }
		}
	    }
	}

    } // ensureUniqueHeadings
    
    /**************************************************************************/
    
    applyHeaderMappings () {
	/* For each key in the 'headerMappings' attribute of the config
	   object, look for that text within the column headings in the
	   workbook. If it is found, replace that heading with the
	   value that goes with that key. */

	if('headerMappings' in this.dataConfig){
	    for(let sheet of Object.values(this.curData.Sheets)){
		let sheetRange = XLSXManager.decodeRange(sheet['!ref']);
		for(let col = sheetRange.s.c; col <= sheetRange.e.c; col++){
		    let address = XLSXManager.encodeAddress({c: col, r: this.headerRow});
		    for(let pattern in this.dataConfig.headerMappings){
			if(sheet[address].t == 's' && sheet[address].v.includes(pattern)){
			    sheet[address].v = this.dataConfig.headerMappings[pattern];
			    sheet[address].w = undefined;
			}
		    }
		}
	    }
	}
	
    } // applyHeaderMappings
    
    /**************************************************************************/

    standardizeIdentifierHeadings () {

	for(let sheet of Object.values(this.curData.Sheets)){
	    let sheetRange = XLSXManager.decodeRange(sheet['!ref']);
	    for(let col = sheetRange.s.c; col <= sheetRange.e.c; col++){
		let address = XLSXManager.encodeAddress({c: col, r: this.headerRow});
		if(address in sheet){
		    for(let identifier of this.identifiers){
			let pattern = new RegExp(identifier.headingPattern, 'i');
			if(sheet[address].t == 's' && pattern.test(sheet[address].v)){
			    sheet[address].v = identifier.standardHeading;
			    sheet[address].w = undefined;
			}
		    }
		}
	    }
	}
	
    } // standardizeIdentifierHeadings
    
    /**************************************************************************/

    convertWorkbookToJSON () {
	/* Convert the data from a workbook object to a JSON object */

	var JSONData = {};
	for(let sheet in this.curData.Sheets){
	    JSONData[sheet] = XLSXManager.sheetToJSON(this.curData.Sheets[sheet], {raw: false, range: this.headerRow, defval: ''});
	}
	this.curData = JSONData;
	
    } // convertWorkbookToJSON
    
    /**************************************************************************/

    doSingleWorksheetCheck () {
	/* Check that there's only one worksheet */

	if(Object.keys(this.curData).length != 1){
	    throw new DataError('Data file can only have one worksheet. Please fix and then reupload the file.');
	}

    } // doSingleWorksheetcheck

    /**************************************************************************/

    formatIdentifierValues () {
	var findPattern, replacement;
	
	for(let sheet in this.curData){
	    for(let identifier of this.identifiers){
		if(identifier.standardHeading in this.curData[sheet][0]){
		    let heading = identifier.standardHeading;

		    if(identifier.formatStandardization.find && identifier.formatStandardization.replace){
			findPattern = new RegExp(identifier.formatStandardization.find, 'g');
			replacement = identifier.formatStandardization.replace;
		    }
		    for(let row of this.curData[sheet]){
			if(identifier.formatStandardization.trim){
			    row[heading] = row[heading].trim();
			}
			if(identifier.formatStandardization.upper){
			    row[heading] = row[heading].toUpperCase();
			}
			if(identifier.formatStandardization.find && identifier.formatStandardization.replace){
			    row[heading] = row[heading].replace(findPattern, replacement);
			}
		    }
		}
	    }
	}
	    
    } // formatIdentifierValues
    
    /**************************************************************************/
    
    doIdentifierCheck () {
	/* Check that the data has at least one field for a recognized student
	   identifier. If it has more than one, determine which one works
	   best for looking up students in the roster. */

	var rosterFields = DataSets.getDataSetFields('@roster');
	this.matchingIdentifiers = {};
	this.lookupIdentifiers = {};
	for(let sheet in this.curData){
	    /* First look for matching pairs of identifiers in the data file
	       and the roster */
	    let matches = [];
	    this.matchingIdentifiers[sheet] = [];
	    for(let identifier of this.identifiers){
		if(identifier.standardHeading in this.curData[sheet][0]){
		    this.matchingIdentifiers[sheet].push(identifier.standardHeading);
		    if(rosterFields.includes(identifier.standardHeading)){
			matches.push(identifier.standardHeading);
		    }
		}
	    }
	    if(matches.length == 0){
		throw new DataError('Sheet "' + sheet + '" does not have any columns with student identifiers that also appear in the roster. Please fix and reupload.');
	    }
	    
	    let bestMatch = null;
	    let bestMatchPerformance = 0;
	    for(let match of matches){
		let identifier = this.identifiers.find(element => element.standardHeading == match);
		let dataIDEntries = this.curData[sheet].map(entry => entry[match]);
		let rosterIDEntries = DataSets.getDataField('@roster', match);
		let overlap = dataIDEntries.filter(entry => rosterIDEntries.includes(entry));
		let matchPerformance = overlap.length / dataIDEntries.length * 100;
		if(matchPerformance > bestMatchPerformance){
		    bestMatch = match;
		    bestMatchPerformance = matchPerformance;
		}
	    }
	    if(bestMatchPerformance == 0){
		throw new DataError('Unable to locate any of the students in "' + sheet + '" in the roster based on the known identifiers. Please double-check that there are identifiers in the file.');
	    } else {
		logger.postMessage('DEBUG', 'data', 'Will look up students in "' + this.tag + ':' + sheet + '" using column "' + bestMatch + '" (' + parseInt(bestMatchPerformance) + '% effective)');
		this.lookupIdentifiers[sheet] = bestMatch;
	    }
	}	

    } // doIdentifierCheck

    /**************************************************************************/
   
    doRequiredFieldsCheck () {
	/* Check that any required fields are present */

	if('requiredFields' in this.dataConfig){
	    for(let field of this.dataConfig.requiredFields){
		for(let sheet in this.curData){
		    if(!(field in this.curData[sheet][0])){
			throw new DataError('A column "' + field + '" is required. Please fix and then reupload the file.');
		    }
		}
	    }
	}
	    
    } // doRequiredFieldsCheck

    /**************************************************************************/
    
    applyResponseMappings () {
	/* For each key in the 'responseMappings' attribute of the config
	   object, look for that field label in the data. If it is found,
	   apply the corresponding mappings to the values of that field.
	*/
	if('responseMappings' in this.dataConfig){
	    for(let sheet in this.curData){
		for(let row of this.curData[sheet]){
		    for(let mapping in this.dataConfig.responseMappings){
			if(mapping in row){
			    for(let target in this.dataConfig.responseMappings[mapping]){
				if(row[mapping] == target){
				    row[mapping] = this.dataConfig.responseMappings[mapping][target];
				    break;
				}
			    }
			}
		    }
		}
	    }
	}
	
    } // applyResponseMappings
    
    /**************************************************************************/

    doUniqueIdentifiersCheck () {
	/* For each worksheet and required identifier field, make sure
	   all the values in the sheet are unique. */
	
	for(let field of this.dataConfig.requiredFields){
	    for(let sheet in this.curData){
		let uniqueValues = new Set(this.curData[sheet].map(entry => entry[field]));
		if(uniqueValues.size != this.curData[sheet].length){
		    throw new DataError('The "' + field + '" column in the sheet "' + sheet + '" has one or more duplicate entries. Please fix and then reupload the file.');
		}
	    }
	}
	
    } // doUniqueIdentifiersCheck
    
    /**************************************************************************/
    
    computeAnonymousIdentifier () {
	/* Create identifiers based on a cryptographic hash of the 
	   canonicalIdentifier field */

	for(let sheet in this.curData){
	    for(let row of this.curData[sheet]){
		row['anonID'] = CryptoJS.SHA256(row[this.dataConfig.canonicalIdentifier].toString()).toString();
	    }
	}

    } // computeAnonymousIdentifier

    /**************************************************************************/

    anonymizeData () {
    	/* We use the best identifier that was found in the data file
	   to look up student anonymous IDs. We then add that to each
	   row, while simultaneously removing any other identifiers. */

	for(let sheet in this.curData){
	    let newData = [];
	    let processedStudents = [];
	    for(let row of this.curData[sheet]){
		var lookupValue = row[this.lookupIdentifiers[sheet]]
		var standardValue = DataSets.checkStudentAlias(this.lookupIdentifiers[sheet], row[this.lookupIdentifiers[sheet]]);
		if(standardValue){
		    if(standardValue == 'not-in-class'){
			logger.postMessage('DEBUG', 'data', 'Student with ' + this.lookupIdentifiers[sheet] + ' "' +row[this.lookupIdentifiers[sheet]] + '" is not in the class, skipping');
			continue;
		    } else {
			logger.postMessage('DEBUG', 'data', '"' + row[this.lookupIdentifiers[sheet]] + '" is an alias for ' + this.lookupIdentifiers[sheet] + ' "' + standardValue + '", converting before lookup');
			lookupValue = standardValue;
		    }
		}
		let anonID = DataSets.findData('@roster', this.lookupIdentifiers[sheet], lookupValue, 'anonID');
		if(!anonID){
		    logger.postMessage('WARN', 'data', this.tag + ':' + sheet + ' - Unable to find student with ' + this.lookupIdentifiers[sheet] + ' "' + row[this.lookupIdentifiers[sheet]] + '" in the roster, prompting user to identify student');
		    let studentList = DataSets.getDataField('@roster', this.lookupIdentifiers[sheet]);
		    StudentSelectorDialog.getUserSelection(this.lookupIdentifiers[sheet], row[this.lookupIdentifiers[sheet]], studentList, this.handleStudentSelection.bind(this));
		    throw new UserInputNeeded();
		}
		if(processedStudents.includes(anonID)){
		    throw new DataError('Sheet "' + sheet + '" has duplicate entry for student with ' + this.lookupIdentifiers[sheet] + ' "' + row[this.lookupIdentifiers[sheet]] + '"; please fix and re-upload the file');
		}
		processedStudents.push(anonID);
		let newRow = { 'anonID': anonID };
		for(let field in row){
		    if(!this.matchingIdentifiers[sheet].includes(field)){
			newRow[field] = row[field];
		    }
		}
		newData.push(newRow);
	    }
	    this.curData[sheet] = newData;
	}

    } // anonymizeData

    /**************************************************************************/

    handleStudentSelection (targetIdentifier, targetStudent, response) {

	logger.postMessage('DEBUG', 'data', 'Setting "' + response + '" as an alias for "' + targetStudent + '" for identifier "' + targetIdentifier + '" and re-trying data processing');
	DataSets.setStudentAlias(targetIdentifier, response, targetStudent);
	errors.resume()
	
    } // handleStudentSelection

    /**************************************************************************/

    setData () {

	/* Clear out any previously set data associated with this data tag.
	   This includes both the tag on its own as well as any tag + sheet
	   combinations. This ensures the data don't get corrupted if the user
	   goes back in the task sequence. */
	DataSets.deleteDataSet(this.tag);
	DataSets.deleteMatchingDataSets('^' + this.tag + '\.');
    	var sheetNames = Object.keys(this.curData);
	if(sheetNames.length == 1){
	    DataSets.setDataSet(this.tag, this.curData[sheetNames[0]]);
	} else {
	    for(let sheet of sheetNames){
		DataSets.setDataSet(this.tag + '.' + sheet, this.curData[sheet]);
	    }
	}

    } // setData

    /**************************************************************************/
    
} // DataSpecialist

export default DataSpecialist;