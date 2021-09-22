{{globals.js_copyright_notice}}

import logger from './logger/logger.js?v={{globals.version}}';

class ConfigManager {

    static moduleRegistry = [];
    
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

    static getConfig (key) {

	return this.configData[key];
	
    } // getConfig
    
    /**************************************************************************/
    
    static registerModule (name, initializer) {

	this.moduleRegistry.push({'name': name, 'initializer': initializer})
	
    } // registerModule

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
