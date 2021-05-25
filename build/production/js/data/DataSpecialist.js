// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger/logger.js?v=0.13.1-beta';
import config from '/dma/js/config.js?v=0.13.1-beta';
import DataError from '/dma/js/errors/DataError.js?v=0.13.1-beta';
import DataWarning from '/dma/js/errors/DataWarning.js?v=0.13.1-beta';
import DataSets from '/dma/js/data/DataSets.js?v=0.13.1-beta';
import xlsx from '/dma/js/xlsx/xlsx.js?v=0.13.1-beta';
import CryptoJS from '/dma/js/cryptojs/sha256.js?v=0.13.1-beta';

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
	this.curData = data;
	this.dataConfig = dataConfig;
	this.identifiers = config.getConfig('identifiers');
	
	for(let step of this.processingSteps){
	    step.bind(this)();
	}
	
    } // processData
    
    /**************************************************************************/
    
    preprocessWAMAPWorkbook () {

	for(let sheet in this.curData.Sheets){
	    if('!ref' in this.curData.Sheets[sheet]){
		/* WAMAP files have two header rows. This combines the
		   entries in the first and second rows and puts the
		   resulting value in the second row. */
		let sheetRange = xlsx.decodeRange(this.curData.Sheets[sheet]['!ref']);
		for(let col = sheetRange.s.c; col <= sheetRange.e.c; col++){
		    let top = xlsx.encodeAddress({c: col, r: 0});
		    let bottom = xlsx.encodeAddress({c: col, r: 1});
		    let fullHeading = this.curData.Sheets[sheet][top].v;
		    if(bottom in this.curData.Sheets[sheet] && this.curData.Sheets[sheet][bottom].t == 's'){
			fullHeading += ':' + this.curData.Sheets[sheet][bottom].v
		    }
		    this.curData.Sheets[sheet][bottom] = {t: 's', v: fullHeading};
		}
	    } else {
		/* WAMAP sometimes generates empty sheets in a workbook,
		   this removes them */
		delete this.curData.Sheets[sheet];
		let index = this.curData.SheetNames.indexOf(sheet);
		this.curData.SheetNames.splice(index, 1);
	    }
	}
	this.headerRow = 1;
	
    } // preprocessWAMAPWorkbook
    
    /**************************************************************************/

    preprocessCWWorkbook () {

	/* CW files have three header rows. This combines the entries
	   in the first, second, and third rows and puts the
	   resulting value in the third row. */
	for(let sheet of Object.values(this.curData.Sheets)){
	    let sheetRange = xlsx.decodeRange(sheet['!ref']);
	    for(let col = sheetRange.s.c; col <= sheetRange.e.c; col++){
		let top = xlsx.encodeAddress({c: col, r: 0});
		let middle = xlsx.encodeAddress({c: col, r: 1});
		let bottom = xlsx.encodeAddress({c: col, r: 2});
		if(sheet[top].t == 's' && sheet[middle].t == 's' && sheet[bottom].t == 's'){
		    let fullHeading = sheet[top].v + ':' + sheet[middle].v + ':' + sheet[bottom].v;
		    sheet[bottom] = {t: 's', v: fullHeading};
		}
	    }
	    sheet['B3'] = { t: 's', v: 'E-mail' };
	}
	this.headerRow = 2;
	
    } // preprocessCWWorkbook
    
    /**************************************************************************/

    preprocessPSVTWorkbook () {

	for(let sheet of Object.values(this.curData.Sheets)){
	    let sheetRange = xlsx.decodeRange(sheet['!ref']);
	    for(let col = sheetRange.s.c; col <= sheetRange.e.c; col++){
		/* PSVT files have a header row, followed by a blank
		   row, then the data. This copies the entries in the first
		   row to the second row, and sets the header row to be the
		   2nd row (index 1). */
		let upper_heading = xlsx.encodeAddress({c: col, r: 0});
		let lower_heading = xlsx.encodeAddress({c: col, r: 1});
		sheet[lower_heading] = {t: 's', v: sheet[upper_heading].v};
		/* PSVT files also have an Averages row at the bottom; we
		   remove this row here. */
		let average_row = xlsx.encodeAddress({c: col, r: sheetRange.e.r});
		delete sheet[average_row];
	    }
	}
	this.headerRow = 1;
	
    } // preprocessPSVTWorkbook
    
    /**************************************************************************/

    preprocessExamWorkbook () {

	/* Exam files have the meaningful header in the second row. */ 
	this.headerRow = 1;
	
    } // preprocessExamWorkbook
    
    /**************************************************************************/

    autoPreprocessWorkbook () {
	/* This attempts to deduce the file's format based on inspecting the
	   contents. It currently can only distinguish between Canvas and
	   WAMAP formats. */
	var firstSheet = this.curData.Sheets[this.curData.SheetNames[0]];
	let sheetRange = xlsx.decodeRange(firstSheet['!ref']);
	var foundPoints = false;
	var foundScored = false;
	for(let col = sheetRange.s.c; col <= sheetRange.e.c; col++){
	    let row2cell = xlsx.encodeAddress({c: col, r: 1});
	    if(row2cell in firstSheet && firstSheet[row2cell].t == 's'){
		if(firstSheet[row2cell].v.includes('Points')){
		    foundPoints = true;
		} else if(firstSheet[row2cell].v.includes('Scored')){
		    foundScored = true;
		}
	    }
	}
	if(foundPoints && foundScored){
	    logger.postMessage('DEBUG', 'data', 'Auto format detection: WAMAP');
	    this.preprocessWAMAPWorkbook()
	} else {
	    logger.postMessage('DEBUG', 'data', 'Auto format detection: Canvas');
	}
	
    } // autoPreprocessWorkbook
    
    /**************************************************************************/
    
    applyHeaderMappings () {
	/* For each key in the 'headerMappings' attribute of the config
	   object, look for that text within the column headings in the
	   workbook. If it is found, replace that heading with the
	   value that goes with that key. */

	if('headerMappings' in this.dataConfig){
	    for(let sheet of Object.values(this.curData.Sheets)){
		let sheetRange = xlsx.decodeRange(sheet['!ref']);
		for(let col = sheetRange.s.c; col <= sheetRange.e.c; col++){
		    let address = xlsx.encodeAddress({c: col, r: this.headerRow});
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
	    let sheetRange = xlsx.decodeRange(sheet['!ref']);
	    for(let col = sheetRange.s.c; col <= sheetRange.e.c; col++){
		let address = xlsx.encodeAddress({c: col, r: this.headerRow});
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
	    JSONData[sheet] = xlsx.sheetToJSON(this.curData.Sheets[sheet], {raw: false, range: this.headerRow, defval: ''});
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

	var rosterFields = DataSets.getDataSetFields('_roster');
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
		let rosterIDEntries = DataSets.getDataField('_roster', match);
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
		try {
		    let anonID = DataSets.findData('_roster', this.lookupIdentifiers[sheet], row[this.lookupIdentifiers[sheet]], 'anonID');
		    if(processedStudents.includes(anonID)){
			throw new DataError('Sheet "' + sheet + '" has duplicate entry for student with ' + this.lookupIdentifiers[sheet] + ' "' + row[this.lookupIdentifiers[sheet].data] + '"; please fix and re-upload the file');
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
		catch (error) {
		    if (error instanceof DataWarning) {
			error.message = this.tag + ':' + sheet + ' - Unable to find student with ' + this.lookupIdentifiers[sheet] + ' "' + row[this.lookupIdentifiers[sheet]] + '" in the roster, skipping';
			logger.postMessage('WARN', 'data', error.message);
		    } else {
			throw error;
		    }
		}
	    }
	    this.curData[sheet] = newData;
	}

    } // anonymizeData

    /**************************************************************************/
    
    setData () {
	
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

    partitionCanvasRoster () {

	if(DataSets.dataFieldExists('_roster', 'GRADE')){
	    DataSets.partitionDataSet('_roster', 'course_grade', ['GRADE']);
	}
	    
    } // partitionCanvasRoster

    /**************************************************************************/
    
} // DataSpecialist

export default DataSpecialist;