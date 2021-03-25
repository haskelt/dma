{{project.js_copyright_notice}}

import logger from '{{project.site_path}}/js/logger/logger.js?v={{project.version}}';
import StudentDataSpecialist from '{{project.site_path}}/js/data/StudentDataSpecialist.js?v={{project.version}}';
import xlsx from '{{project.site_path}}/js/xlsx/xlsx.js?v={{project.version}}';

class CanvasSpecialist extends StudentDataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	/* Canvas ID ('id') isn't in the roster but we want to scrub
	   it from the data anyway. By listing it as the last possible
	   identifier, it should never be used to look a student up,
	   but will still get removed when the data is anonymized. */
	this.possibleIdentifiers = {'sis_id': 'pretty_sid', 'name': 'pretty_name', 'id': null};
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
