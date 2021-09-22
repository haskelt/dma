{{globals.js_copyright_notice}}

import logger from '../logger/logger.js?v={{globals.version}}';
import DataSpecialist from './DataSpecialist.js?v={{globals.version}}';
import DataSpecialistFactory from './DataSpecialistFactory.js?v={{globals.version}}';
import DataSets from './DataSets.js?v={{globals.version}}';

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
