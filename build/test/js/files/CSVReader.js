// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';

class CSVReader {

    /**************************************************************************/

    read (fileObject, callback) {

	this.callback = callback;
	Papa.parse(fileObject, { complete: this.finishRead.bind(this), header: true });
	
    } // read
    
    /**************************************************************************/

    finishRead (results) {

	if(results.errors.length > 0){
	    for(let error of results.errors){
		logger.postMessage('ERROR', 'files', error.message + ' at row ' + error.row);
	    }
	    this.callback(null);
	} else {
	    logger.postMessage('TRACE', 'files', 'Successfully parsed CSV file');
	    this.callback(results.data);
	}
	
    } // 
    
    /**************************************************************************/
    
} // CSVReader

export default CSVReader;

