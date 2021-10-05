/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import config from '../config.js?v=0.24.2-beta';
import logger from '../logger/logger.js?v=0.24.2-beta';
import ConfigError from '../errors/ConfigError.js?v=0.24.2-beta';

function initialize () {

    logger.postMessage('DEBUG', 'xlsx', 'Initializing xlsx module');
    // check for browser support
    if (typeof (FileReader) == 'undefined') {
        throw new ConfigError('This app does not work on browsers without HTML5 support.');
    } else {
	var reader = new FileReader();
	if(!reader.readAsBinaryString){
	    throw new ConfigError('This app does not work on Internet Explorer');
	}
    }
    return Promise.resolve(true);
    
} // initialize

config.registerModule('xlsx', initialize);



