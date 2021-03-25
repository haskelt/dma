{{project.js_copyright_notice}}

import logger from '{{project.site_path}}/js/logger/logger.js?v={{project.version}}';
import DataSets from '{{project.site_path}}/js/data/DataSets.js?v={{project.version}}';

class CourseInfoSpecialist {

    /**************************************************************************/
    
    constructor () {

	this.processingSteps = [];
	
    } // constructor
    
    /**************************************************************************/

    setData (tag, data, requiredFields) {

	logger.postMessage('DEBUG', 'data', 'Setting student data ' + tag);

	this.curData = data;
	this.requiredFields = requiredFields;

	for(let step of this.processingSteps){
	    step.bind(this)();
	}

	var sheetNames = Object.keys(this.curData);
	if(sheetNames.length == 1){
	    DataSets.setDataSet(tag, this.curData[sheetNames[0]]);
	} else {
	    for(let sheet of sheetNames){
		DataSets.setDataSet(tag + '.' + sheet, this.curData[sheet]);
	    }
	}
	
    } // setData
    
    /**************************************************************************/
    
} // CourseInfoSpecialist

export default CourseInfoSpecialist;
