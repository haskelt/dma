{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{SITE_PATH}}/js/logger.js';
import DataSpecialist from '{{SITE_PATH}}/js/data/DataSpecialist.js';
import DataSets from '{{SITE_PATH}}/js/data/DataSets.js';

class MetadataSpecialist extends DataSpecialist {

    /**************************************************************************/
    
    constructor () {

	super();
	this.processingSteps = [ this.mergeMetadata ];
	
    } // constructor
    
    /**************************************************************************/

    mergeMetadata () {

	var metadata = DataSets.getDataSet('_meta');
	if(!metadata){
	    metadata = {};
	}
	metadata[this.tag] = this.curData;
	this.curData = metadata;
	
    } // mergeMetadata
    
    /**************************************************************************/

    setData () {

	DataSets.setDataSet('_meta', this.curData);
	
    } // setData
    
    /**************************************************************************/
    
} // MetadataSpecialist

export default MetadataSpecialist;
