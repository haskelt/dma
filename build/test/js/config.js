/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import utilities from './utilities.js?v=0.26.0-beta';
import logger from './logger/logger.js?v=0.26.0-beta';

class ConfigManager {

    static moduleRegistry = [];
    
    /**************************************************************************/
    
    static storeConfig (response) {

	logger.postMessage('DEBUG', 'config', 'Loaded configuration file');
	this.configData = response;
	return Promise.resolve(true);

    } // storeConfig

    /**************************************************************************/

    static getConfig (key) {

	return this.configData[key];
	
    } // getConfig
    
    /**************************************************************************/
    
    static registerModule (name, initializer) {

	this.moduleRegistry.push({'name': name, 'initializer': initializer})
	
    } // registerModule

    /**************************************************************************/

    static initializeModules () {

	var curPromise = Promise.resolve(true); 
	for(let moduleSpecs of this.moduleRegistry) {
	    logger.postMessage('TRACE', 'config', 'Queuing initialization for module ' + moduleSpecs.name);
	    curPromise = curPromise.then(moduleSpecs.initializer); 
	}
	return curPromise;
	
    } // initializeModules
    
    /**************************************************************************/
    
    static initialize () {

	utilities.fetchJSON('config.json')
	    .then(this.storeConfig.bind(this))
	    .then(this.initializeModules.bind(this))
	    .catch(err => window.dispatchEvent(new ErrorEvent('error', {error: err, message: err.message })));
	
    } // initialize
    
    /**************************************************************************/
    
} // ConfigManager

export default ConfigManager;