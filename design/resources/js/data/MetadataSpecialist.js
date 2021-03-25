{{project.js_copyright_notice}}

import logger from '{{project.site_path}}/js/logger/logger.js?v={{project.version}}';
import DataSpecialist from '{{project.site_path}}/js/data/DataSpecialist.js?v={{project.version}}';
import DataSets from '{{project.site_path}}/js/data/DataSets.js?v={{project.version}}';

class MetadataSpecialist extends DataSpecialist {

    /**************************************************************************/
    
    constructor () {

	super();
	this.processingSteps = [
	    this.mergeMetadata,
	    this.setData
	];
	
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
