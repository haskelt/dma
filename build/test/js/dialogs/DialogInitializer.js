// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger/logger.js?v=0.17.2-beta';

class DialogInitializer {

    static initializers = {};
    
    /**************************************************************************/

    static registerInitializer (dialogType, initializer) {

	logger.postMessage('TRACE', 'dialogs', 'Registering dialog initializer of type ' + dialogType);
	DialogInitializer.initializers[dialogType] = initializer;
	
    } // registerInitializer

    /**************************************************************************/

    static initialize (dialogType, element) {

	logger.postMessage('DEBUG', 'dialogs', 'Initializing dialog of type ' + dialogType);
	DialogInitializer.initializers[dialogType](element);
	
    } // initialize

    /**************************************************************************/
    
}

export default DialogInitializer;