{{globals.js_copyright_notice}}

import logger from '{{globals.site_path}}/js/logger/logger.js?v={{globals.version}}';
import DataSpecialist from '{{globals.site_path}}/js/data/DataSpecialist.js?v={{globals.version}}';
import DataSpecialistFactory from '{{globals.site_path}}/js/data/DataSpecialistFactory.js?v={{globals.version}}';
import DataSets from '{{globals.site_path}}/js/data/DataSets.js?v={{globals.version}}';

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

DataSpecialistFactory.register('Metadata', MetadataSpecialist);
