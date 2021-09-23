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

    static prepareNextModule () {

	if(this.moduleRegistry.length > 0){
	    return this.doNextModule.bind(this)();
	} else {
	    this.loaded = true;
	    return Promise.resolve(true);
	}
	
    } // prepareNextModule
    
    /**************************************************************************/

    static doNextModule () {

	var moduleSpecs = this.moduleRegistry.shift();
	logger.postMessage('DEBUG', 'config', 'Initializing module ' + moduleSpecs.name);
	return moduleSpecs.initializer()
	    .then(this.prepareNextModule.bind(this));
	
    } // doNextModule

    /**************************************************************************/

    static initialize () {

	this.fetchJSON('config.json')
	    .then(this.storeConfig.bind(this))
	    .then(this.prepareNextModule.bind(this));
	
    } // initialize
    
    /**************************************************************************/
    
} // ConfigManager

export default ConfigManager;
