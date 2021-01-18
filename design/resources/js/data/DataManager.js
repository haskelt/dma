{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{SITE_PATH}}/js/logger.js';
import DataSpecialistFactory from '{{SITE_PATH}}/js/data/DataSpecialistFactory.js';
import DataSets from '{{SITE_PATH}}/js/data/DataSets.js';

class DataManager {

    static data = {};
    static dataConfig = {
	'_roster': { 'dataClass': 'Roster', 'requiredFields': ["Student's Name", 'SID', 'Email'] },
	'demographics': { 'dataClass': 'Canvas', 'requiredFields': ['117284167:'] },
	'mct_pre': { 'dataClass': 'Canvas', 'requiredFields': [] },
	'mct_post': { 'dataClass': 'Canvas', 'requiredFields': [] },
	'cw': { 'dataClass': 'CW', 'requiredFields': [] },
	'exam': { 'dataClass': 'Exam', 'requiredFields': [] }
    };
    
    /**************************************************************************/

    static postData (tag, data) {

	logger.postMessage('DEBUG', 'data', 'Posting data for tag ' + tag + ' of ' + data);
	if(tag in this.dataConfig){
	    let specialist = DataSpecialistFactory.build(this.dataConfig[tag]['dataClass']);
	    specialist.setData.bind(specialist)(tag, data, this.dataConfig[tag]['requiredFields']);
	} else {
	    this.data[tag] = data;
	    //throw Error('No data handling configured for ' + tag);
	}
	
    } // postData
    
    /**************************************************************************/

    static finalizeData () {

	DataSets.applyFilter('demographics', '117284167:', 'I give permission to include my responses in this study');
	
    } // finalizeData

    /**************************************************************************/
    
    static exportData () {

	DataSets.exportData('EMARCS Data.xlsx');
	
    } // exportData
    
    /**************************************************************************/
    
}

export default DataManager;
