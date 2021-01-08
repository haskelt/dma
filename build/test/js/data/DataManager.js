// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';

class DataManager {

    static data = {};
    
    /**************************************************************************/

    static postData (tag, data) {

	logger.postMessage('DEBUG', 'data', 'Receiving data for tag ' + tag + ' of ' + data);
	DataManager.data[tag] = data;
	
    } // postData
    
    /**************************************************************************/

}

export default DataManager;