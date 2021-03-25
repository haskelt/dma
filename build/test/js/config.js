// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger/logger.js?v=0.6.1-beta';

class ConfigManager {

    static moduleRegistry = [];
    
    /**************************************************************************/

    static registerModule (name, initializer) {

	this.moduleRegistry.push({'name': name, 'initializer': initializer})
	
    } // registerModule

    /**************************************************************************/

    static fetchJSON (filename) {

	return fetch(filename)
            .then(function(response) {
		if(response.ok){
                    return response.json();
		} else {
                    return { error: 'Failed to load JSON' };
		}
            });

    } // fetchJSON

    /**************************************************************************/
    
    static storeConfig (response) {

	logger.postMessage('DEBUG', 'config', 'Loaded configuration file');
	this.configData = response;
	return Promise.resolve(true);

    } // storeConfig

    /**************************************************************************/

    static initializeModules () {

	for(let entry of this.moduleRegistry){
	    logger.postMessage('DEBUG', 'config', 'Initializing module ' + entry.name);
	    entry.initializer();
	}
	
    } // initializeModules
    
    /**************************************************************************/

    static initialize () {

	this.fetchJSON('config.json')
	    .then(this.storeConfig.bind(this))
	    .then(this.initializeModules.bind(this));
	
    } // initialize
    
    /**************************************************************************/
    
} // ConfigManager

export default ConfigManager;