// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger/logger.js?v=0.6.1-beta';
import StudentDataSpecialist from '/js/data/StudentDataSpecialist.js?v=0.6.1-beta';
import xlsx from '/js/xlsx/xlsx.js?v=0.6.1-beta';

class CanvasSpecialist extends StudentDataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.fixHeadings,
	    this.convertWorkbookToJSON,
	    this.doSingleWorksheetCheck,
	    this.doIdentifierCheck,
	    this.doRequiredFieldsCheck,
	    this.anonymizeData,
	    this.setData
	];

    } // constructor
    
    /**************************************************************************/

    fixHeadings () {
	/* For each key in the 'headerMappings' attribute of the config
	   object, look for that text within the column headings in the
	   workbook. If it is found, replace that heading with the
	   value that goes with that key. */

	if('headerMappings' in this.config){
	    for(let sheet of Object.values(this.curData.Sheets)){
		let sheetRange = xlsx.decodeRange(sheet['!ref']);
		for(let col = sheetRange.s.c; col <= sheetRange.e.c; col++){
		    let address = xlsx.encodeAddress({c: col, r: 0});
		    for(let pattern in this.config.headerMappings){
			if(sheet[address].t == 's' && sheet[address].v.includes(pattern)){
			    sheet[address].v = this.config.headerMappings[pattern];
			}
		    }
		}
	    }
	}
	
    } // fixHeadings
    
    /**************************************************************************/

} // CanvasSpecialist

export default CanvasSpecialist;