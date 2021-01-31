// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger.js?v=0.1.2-beta';
import DataSpecialist from '/dma/js/data/DataSpecialist.js?v=0.1.2-beta';
import DataSets from '/dma/js/data/DataSets.js?v=0.1.2-beta';

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