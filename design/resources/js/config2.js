/* Copyright 2019 Craggy Peak Research */

import __utilities from './utilities.js';

class ConfigManager {

/*****************************************************************************/

    constructor () {
	
	console.log("Initializing config manager");

	this.config_data = {};
	this.loaded = false;
	this.config_files_to_load = [ '${CONFIG_PATH}' ];
	this.config_load_promise = this.loadNextFile();

    } // constructor

/*****************************************************************************/

    loadNextFile (response) {

	if(response){
	    this.config_files_to_load.shift();
	    for(let param in response){
		this.config_data[param] = response[param];
	    }
	}
	if(this.config_files_to_load.length > 0){
	    return __utilities.fetchJSON(this.config_files_to_load[0])
		.then(this.loadNextFile.bind(this));
	} else {
	    this.loaded = true;
	    return Promise.resolve(true);
	}
	
    } // loadNextFile


/*****************************************************************************/

    waitForConfigLoad () {

	if(this.loaded){
	    return Promise.resolve(true);
	} else {
	    return this.config_load_promise;
	}

    } // waitForConfigLoad

/*****************************************************************************/

    getConfigData (key) {
	
	if(key in this.config_data){
	    return this.config_data[key];
	} else {
	    return null;
	}

    } // getConfigData

/*****************************************************************************/

}

export default new ConfigManager();
