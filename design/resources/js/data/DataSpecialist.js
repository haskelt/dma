{{globals.js_copyright_notice}}

import logger from '{{globals.site_path}}/js/logger/logger.js?v={{globals.version}}';
import config from '{{globals.site_path}}/js/config.js?v={{globals.version}}';
import DataError from '{{globals.site_path}}/js/errors/DataError.js?v={{globals.version}}';
import DataWarning from '{{globals.site_path}}/js/errors/DataWarning.js?v={{globals.version}}';
import UserInputNeeded from '{{globals.site_path}}/js/errors/UserInputNeeded.js?v={{globals.version}}';
import errors from '{{globals.site_path}}/js/errors/errors.js?v={{globals.version}}';
import DataSets from '{{globals.site_path}}/js/data/DataSets.js?v={{globals.version}}';
import xlsx from '{{globals.site_path}}/js/xlsx/xlsx.js?v={{globals.version}}';
import CryptoJS from '{{globals.site_path}}/js/cryptojs/sha256.js?v={{globals.version}}';
import StudentSelectorDialog from '{{globals.site_path}}/js/dialogs/StudentSelectorDialog.js?v={{globals.version}}';

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
    
    preprocessCanvasGradebook () {
	/* Canvas gradebook files have three header rows, but only the first
	   has anything useful. This copies the entries in the first row
	   to the third row, and sets the header row to the 3rd row. */
	for(let sheet of Object.values(this.curData.Sheets)){
	    let sheetRange = xlsx.decodeRange(sheet['!ref']);
	    for(let col = sheetRange.s.c; col <= sheetRange.e.c; col++){
		let top = xlsx.encodeAddress({c: col, r: 0});
		let bottom = xlsx.encodeAddress({c: col, r: 2});
		sheet[bottom] = sheet[top];
	    }
	}
	this.headerRow = 2;
	
    } // preprocessCanvasGradebook
    
    /**************************************************************************/

    preprocessWAMAPAssessment () {

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
	
    } // preprocessWAMAPAssessment
    
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

    preprocessWAMAPGradebook () {

	for(let sheet of Object.values(this.curData.Sheets)){
	    let sheetRange = xlsx.decodeRange(sheet['!ref']);
	    for(let col = sheetRange.s.c; col <= sheetRange.e.c; col++){
		/* Gradebook files have a header row, followed by a blank
		   row, then the data. This copies the entries in the first
		   row to the second row, and sets the header row to be the
		   2nd row (index 1). */
		let upper_heading = xlsx.encodeAddress({c: col, r: 0});
		let lower_heading = xlsx.encodeAddress({c: col, r: 1});
		sheet[lower_heading] = {t: 's', v: sheet[upper_heading].v};
		/* Gradebook files also have an Averages row at the bottom; we
		   remove this row here. */
		let average_row = xlsx.encodeAddress({c: col, r: sheetRange.e.r});
		delete sheet[average_row];
	    }
	}
	this.headerRow = 1;
	
    } // preprocessWAMAPGradebook
    
    /**************************************************************************/

    preprocessAnnotatedCanvasAssessment () {
	/* This is for Canvas assessment files where an extra header row
	   has been manually added at the top. It combines the 1st and 2nd
	   header rows into a single header in the 2nd row. */
	for(let sheet in this.curData.Sheets){
	    let sheetRange = xlsx.decodeRange(this.curData.Sheets[sheet]['!ref']);
	    for(let col = sheetRange.s.c; col <= sheetRange.e.c; col++){
		let top = xlsx.encodeAddress({c: col, r: 0});
		let bottom = xlsx.encodeAddress({c: col, r: 1});
		let fullHeading = '';
		if(top in this.curData.Sheets[sheet]){
		    fullHeading += this.curData.Sheets[sheet][top].v;
		}
		if(bottom in this.curData.Sheets[sheet]){
		    if(fullHeading.length > 0){
			fullHeading += ':';
		    }
		    fullHeading += this.curData.Sheets[sheet][bottom].v
		}
		this.curData.Sheets[sheet][bottom] = {t: 's', v: fullHeading};
	    }
	}
	this.headerRow = 1;
	
    } // preprocessAnnotatedCanvasAssessment
    
    /**************************************************************************/

    autoPreprocessWorkbook () {
	/* This attempts to deduce the file's format based on inspecting the
	   contents. It currently can only distinguish between Canvas, and
	   WAMAP assessment, and WAMAP gradebook formats. */
	var firstSheet = this.curData.Sheets[this.curData.SheetNames[0]];
	let sheetRange = xlsx.decodeRange(firstSheet['!ref']);

	var foundPoints = false;
	var foundScored = false;
	var foundAverages = false;
	var foundPointsPossible = false;
	var foundOffsetName = false;
	
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

	var averagesCell = xlsx.encodeAddress({c: 0, r: sheetRange.e.r});
	if(averagesCell in firstSheet && firstSheet[averagesCell].t == 's'){
	    if(firstSheet[averagesCell].v.includes('Averages')){
		foundAverages = true;
	    }
	}

	var pointsPossibleCell = xlsx.encodeAddress({c: 0, r: 2});
	if(pointsPossibleCell in firstSheet && firstSheet[pointsPossibleCell].t == 's'){
	    if(firstSheet[pointsPossibleCell].v.includes('Points Possible')){
		foundPointsPossible = true;
	    }
	}

	var offsetNameCell = xlsx.encodeAddress({c: 0, r: 1});
	if(offsetNameCell in firstSheet && firstSheet[offsetNameCell].t == 's'){
	    if(firstSheet[offsetNameCell].v == 'name'){
		foundOffsetName = true;
	    }
	}
	
	if(foundPoints && foundScored){
	    logger.postMessage('DEBUG', 'data', 'Auto format detection: WAMAP Assessment');
	    this.preprocessWAMAPAssessment();
	} else if(foundPointsPossible){
	    logger.postMessage('DEBUG', 'data', 'Auto format detection: Canvas Gradebook');
	    this.preprocessCanvasGradebook();
	} else if(foundAverages){
	    logger.postMessage('DEBUG', 'data', 'Auto format detection: WAMAP Gradebook');
	    this.preprocessWAMAPGradebook();
	} else if(foundOffsetName){
	    logger.postMessage('DEBUG', 'data', 'Auto format detection: Annotated Canvas Assessment');
	    this.preprocessAnnotatedCanvasAssessment();
	} else {
	    logger.postMessage('DEBUG', 'data', 'Auto format detection: Canvas Assessment');
	}
	
    } // autoPreprocessWorkbook
    
    /**************************************************************************/

    ensureUniqueHeadings () {

	for(let sheet of Object.values(this.curData.Sheets)){
	    let headingAddresses = {};
	    let sheetRange = xlsx.decodeRange(sheet['!ref']);
	    for(let col = sheetRange.s.c; col <= sheetRange.e.c; col++){
		let address = xlsx.encodeAddress({c: col, r: this.headerRow});
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
		let anonID = DataSets.findData('_roster', this.lookupIdentifiers[sheet], lookupValue, 'anonID');
		if(!anonID){
		    logger.postMessage('WARN', 'data', this.tag + ':' + sheet + ' - Unable to find student with ' + this.lookupIdentifiers[sheet] + ' "' + row[this.lookupIdentifiers[sheet]] + '" in the roster, prompting user to identify student');
		    let studentList = DataSets.getDataField('_roster', this.lookupIdentifiers[sheet]);
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

	if(DataSets.dataFieldExists('_roster', 'Grade')){
	    DataSets.partitionDataSet('_roster', 'course_grade', ['Grade']);
	}
	    
    } // partitionCanvasRoster

    /**************************************************************************/
    
} // DataSpecialist

export default DataSpecialist;
