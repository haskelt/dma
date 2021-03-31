{{project.js_copyright_notice}}

import logger from '{{project.site_path}}/js/logger/logger.js?v={{project.version}}';
import DataError from '{{project.site_path}}/js/errors/DataError.js?v={{project.version}}';
import DataWarning from '{{project.site_path}}/js/errors/DataWarning.js?v={{project.version}}';
import DataSets from '{{project.site_path}}/js/data/DataSets.js?v={{project.version}}';
import xlsx from '{{project.site_path}}/js/xlsx/xlsx.js?v={{project.version}}';
import CryptoJS from '{{project.site_path}}/js/cryptojs/sha256.js?v={{project.version}}';

class DataSpecialist {

    /**************************************************************************/
    
    constructor () {

	this.headerRow = 0;
	this.processingSteps = [];
	
    } // constructor
    
    /**************************************************************************/

    processData (tag, data, config) {

	logger.postMessage('DEBUG', 'data', 'Setting data ' + tag);

	this.tag = tag;
	this.curData = data;
	this.config = config;

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
	    console.log(sheet);
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

	/* PSVT files have a blank first row with the header in the second
	   row. */ 
	this.headerRow = 1;
	
    } // preprocessExamWorkbook
    
    /**************************************************************************/

    applyHeaderMappings () {
	/* For each key in the 'headerMappings' attribute of the config
	   object, look for that text within the column headings in the
	   workbook. If it is found, replace that heading with the
	   value that goes with that key. */

	if('headerMappings' in this.config){
	    for(let sheet of Object.values(this.curData.Sheets)){
		let sheetRange = xlsx.decodeRange(sheet['!ref']);
		for(let col = sheetRange.s.c; col <= sheetRange.e.c; col++){
		    let address = xlsx.encodeAddress({c: col, r: this.headerRow});
		    for(let pattern in this.config.headerMappings){
			if(sheet[address].t == 's' && sheet[address].v.includes(pattern)){
			    sheet[address].v = this.config.headerMappings[pattern];
			}
		    }
		}
	    }
	}
	
    } // applyHeaderMappings
    
    /**************************************************************************/

    convertWorkbookToJSON () {
	/* Convert the data from a workbook object to a JSON object */

	var JSONData = {};
	for(let sheet in this.curData.Sheets){
	    JSONData[sheet] = xlsx.sheetToJSON(this.curData.Sheets[sheet], {range: this.headerRow, defval: ''});
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

    doIdentifierCheck () {
	/* Check that the data has a field for a recognized student
	   identifier */

	this.identifiers = {};
	for(let sheet in this.curData){
	    var matches = [];
	    for(let identifier of Object.keys(this.config.possibleIdentifiers)){
		if(identifier in this.curData[sheet][0]){
		    matches.push(identifier);
		}
	    }
	    if(matches.length == 0){
		throw new DataError('Sheet "' + sheet + '" does not have any columns with valid student identifiers. Please fix and reupload.');
	    } else {
		this.identifiers[sheet] = matches;
	    }
	}

    } // doIdentifierCheck

    /**************************************************************************/
   
    doRequiredFieldsCheck () {
	/* Check that any required fields are present */

	if('requiredFields' in this.config){
	    for(let field of this.config.requiredFields){
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
	if('responseMappings' in this.config){
	    for(let sheet in this.curData){
		for(let row of this.curData[sheet]){
		    for(let mapping in this.config.responseMappings){
			if(mapping in row){
			    console.log('doing response mappings for ' + mapping + ' with value ' + row[mapping]);
			    for(let pattern in this.config.responseMappings[mapping]){
				if(row[mapping] == pattern){
				    row[mapping] = this.config.responseMappings[mapping][pattern];
				    console.log('Replaced ' + pattern + ' with ' + row[mapping]);
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
	
	for(let field of this.config.requiredFields){
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

	console.log(this.config.canonicalIdentifier);
	for(let sheet in this.curData){
	    for(let row of this.curData[sheet]){
		console.log(row[this.config.canonicalIdentifier]);
		
		row['anonID'] = CryptoJS.SHA256(row[this.config.canonicalIdentifier].toString()).toString();
	    }
	}

    } // computeAnonymousIdentifier

    /**************************************************************************/

    computeCanvasPrettyNames () {
	
	for(let sheet in this.curData){
	    for(let row of this.curData[sheet]){
		let nameFields = row["STUDENT'S NAME"].split(' ');
		row['pretty_name'] = nameFields[1] + ' ' + nameFields[0];
	    }
	}
	
    } // computeCanvasPrettyNames
    
    /**************************************************************************/

    computeCanvasPrettySIDs () {
	
	for(let sheet in this.curData){
	    for(let row of this.curData[sheet]){
		let sidFields = row['SID'].split('-');
		row['pretty_sid'] = sidFields[0] + sidFields[1] + sidFields[2];
	    }
	}
	
    } // computeCanvasPrettySIDs
    
    /**************************************************************************/

    anonymizeData () {
    	/* We use the first identifier that was found in the data file
	   to look up student anonymous IDs. We then add that to each
	   row, while simultaneously removing any other identifiers. */

	for(let sheet in this.curData){
	    let newData = [];
	    let rosterIDType = this.config.possibleIdentifiers[this.identifiers[sheet][0]];
	    let processedStudents = [];
	    for(let row of this.curData[sheet]){
		try {
		    let anonID = DataSets.findData('_roster', rosterIDType, row[this.identifiers[sheet][0]], 'anonID');
		    if(processedStudents.includes(anonID)){
			throw new DataError('Sheet "' + sheet + '" has duplicate entry for student with ' + this.identifiers[sheet][0] + ' "' + row[this.identifiers[sheet][0]] + '"; please fix and re-upload the file');
		    }
		    processedStudents.push(anonID);
		    let newRow = { 'anonID': anonID };
		    for(let field in row){
			if(!(this.identifiers[sheet].includes(field))){
			    newRow[field] = row[field];
			}
		    }
		    newData.push(newRow);
		}
		catch (error) {
		    if (error instanceof DataWarning) {
			error.message = 'Unable to find student with ' + this.identifiers[sheet][0] + ' "' + row[this.identifiers[sheet][0]] + '" in the roster, skipping';
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
	
	DataSets.partitionDataSet('_roster', 'course_grade', ['GRADE']);

    } // partitionCanvasRoster

    /**************************************************************************/
    
} // DataSpecialist

export default DataSpecialist;
