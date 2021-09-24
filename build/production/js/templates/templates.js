// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import config from '../config.js?v=0.22.1-beta';
import utilities from '../utilities.js?v=0.22.1-beta';
import logger from '../logger/logger.js?v=0.22.1-beta';

class TemplateManager {
    
    /**************************************************************************/

    static loadConfig () {

	return utilities.fetchJSON('../config/templates.json')
	    .then((response) => this.configData = response);

    } // loadConfig

    /**************************************************************************/

    static loadTemplate (name, content) {

	return utilities.fetchText('../../templates/' + name + '.html')
	    .then((response) => this.templates[name] = response);
	
    } // loadTemplate
    
    /**************************************************************************/

    static loadAllTemplates () {

	this.templates = {};
	if(!('templates' in this.configData)){
	    logger.postMessage('ERROR', 'templates', 'Templates config file does not have a list of templates');
	    return Promise.reject(false);
	}
	
	var curPromise = Promise.resolve(true); 
	for(let template of this.configData.templates){
	    logger.postMessage('DEBUG', 'templates', 'Loading template ' + template);
	    curPromise = curPromise.then(this.loadTemplate.bind(this, template));
	}
	return curPromise;
	
    } // loadAllTemplates

    /**************************************************************************/

    static initialize () {

	logger.postMessage('DEBUG', 'templates', 'Initializing templates module');
	return this.loadConfig()
	    .then(this.loadAllTemplates.bind(this));

    } // initialize

    /**************************************************************************/

} // TemplateManager

config.registerModule('templates', TemplateManager.initialize.bind(TemplateManager));

