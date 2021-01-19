// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger.js';
import DataSpecialist from '/dma/js/data/DataSpecialist.js';
import DataSets from '/dma/js/data/DataSets.js';

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