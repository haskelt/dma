{{globals.js_copyright_notice}}

import config from '../config.js?v={{globals.version}}';
import logger from '../logger/logger.js?v={{globals.version}}';
import ConfigError from '../errors/ConfigError.js?v={{globals.version}}';

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




