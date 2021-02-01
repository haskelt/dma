// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger/logger.js?v=0.2.0-beta';
import StudentDataSpecialist from '/js/data/StudentDataSpecialist.js?v=0.2.0-beta';
import xlsx from '/js/xlsx/xlsx.js?v=0.2.0-beta';

class CWSpecialist extends StudentDataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.possibleIdentifiers = {'E-mail': 'EMAIL'};
	this.processingSteps = [
	    this.fixHeadings,
	    this.convertWorkbookToJSON,
	    this.doIdentifierCheck,
	    this.doRequiredFieldsCheck,
	    this.anonymizeData 
	];

    } // constructor
    
    /**************************************************************************/

    fixHeadings () {

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
	
    } // fixHeadings
    
    /**************************************************************************/
    
} // CWSpecialist

export default CWSpecialist;