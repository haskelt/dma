{{project.js_copyright_notice}}

import logger from '{{project.site_path}}/js/logger/logger.js?v={{project.version}}';
import StudentDataSpecialist from '{{project.site_path}}/js/data/StudentDataSpecialist.js?v={{project.version}}';
import xlsx from '{{project.site_path}}/js/xlsx/xlsx.js?v={{project.version}}';

class WAMAPSpecialist extends StudentDataSpecialist {

    /**************************************************************************/

    constructor () {

	super();
	this.processingSteps = [
	    this.fixHeadings,
	    this.convertWorkbookToJSON,
	    this.doIdentifierCheck,
	    this.doRequiredFieldsCheck,
	    this.anonymizeData,
	    this.setData
	];

    } // constructor
    
    /**************************************************************************/

    fixHeadings () {

	for(let sheet in this.curData.Sheets){
	    if('!ref' in this.curData.Sheets[sheet]){
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
	
    } // fixHeadings
    
    /**************************************************************************/

} // WAMAPSpecialist

export default WAMAPSpecialist;
