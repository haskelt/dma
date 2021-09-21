// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger/logger.js?v=0.21.3-beta';
import DataSets from '/dma/js/data/DataSets.js?v=0.21.3-beta';
import xlsx from '/dma/js/xlsx/xlsx.js?v=0.21.3-beta';
import DataSpecialist from '/dma/js/data/DataSpecialist.js?v=0.21.3-beta';

class EMARCSDataSpecialist extends DataSpecialist {

    /**************************************************************************/
    
    constructor () {

	super();
	
    } // constructor
    
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

    partitionCanvasRoster () {

	if(DataSets.dataFieldExists('@roster', 'Grade')){
	    DataSets.partitionDataSet('@roster', 'course_grade', ['Grade']);
	}
	    
    } // partitionCanvasRoster

    /**************************************************************************/
    
} // EMARCSDataSpecialist

export default EMARCSDataSpecialist;