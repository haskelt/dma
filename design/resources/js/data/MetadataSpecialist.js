{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{SITE_PATH}}/js/logger/logger.js?v={{VERSION}}';
import DataSpecialist from '{{SITE_PATH}}/js/data/DataSpecialist.js?v={{VERSION}}';
import DataSets from '{{SITE_PATH}}/js/data/DataSets.js?v={{VERSION}}';

class MetadataSpecialist extends DataSpecialist {

    /**************************************************************************/
    
    constructor () {

	super();
	this.processingSteps = [ this.mergeMetadata ];
	
    } // constructor
    
    /**************************************************************************/

    mergeMetadata () {

	var metadata = DataSets.getDataSet('@meta');
	if(!metadata){
	    metadata = {};
	}
	metadata[this.tag] = this.curData;
	this.curData = metadata;
	
    } // mergeMetadata
    
    /**************************************************************************/

    setData () {

	DataSets.setDataSet('@meta', this.curData);
	
    } // setData
    
    /**************************************************************************/
    
} // MetadataSpecialist

export default MetadataSpecialist;
