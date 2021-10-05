/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import logger from '../logger/logger.js?v=0.24.0-beta';
import DataSpecialist from './DataSpecialist.js?v=0.24.0-beta';
import DataSpecialistFactory from './DataSpecialistFactory.js?v=0.24.0-beta';
import DataSets from './DataSets.js?v=0.24.0-beta';

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