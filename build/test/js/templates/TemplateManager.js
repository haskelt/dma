/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import utilities from '../utilities.js?v=0.23.0-beta';
import logger from '../logger/logger.js?v=0.23.0-beta';
import ConfigError from '../errors/ConfigError.js?v=0.23.0-beta';

class TemplateManager {

    static optionTemplate = '<div class="dialogs__radio-option"><input type="radio" name="{=id=}" value="{=optionValue=}"><label for="{=optionValue=}">{=optionText=}</label></div>';
    
    /**************************************************************************/

    static initialize () {

	return this.getConfig()
	    .then(this.loadAll.bind(this));

    } // initialize

    /**************************************************************************/

    static getConfig () {

	return utilities.fetchJSON('../config/templates.json')
	    .then((response) => this.configData = response);

    } // getConfig

    /**************************************************************************/

    static load (name, content) {

	return utilities.fetchText('../../templates/' + name + '.html')
	    .then((response) => this.templates[name] = response);
	
    } // load
    
    /**************************************************************************/

    static loadAll () {

	this.templates = {};
	if(!('templates' in this.configData)){
	    throw new ConfigError('Templates config file does not have a list of templates');
	}
	
	var curPromise = Promise.resolve(true); 
	for(let template of this.configData.templates){
	    logger.postMessage('DEBUG', 'templates', 'Loading template ' + template);
	    curPromise = curPromise.then(this.load.bind(this, template));
	}
	return curPromise;
	
    } // loadAll

    /**************************************************************************/

    /* <template> should be a string of HTML, with 0 or more of the following
       special directives (applied in this order):

       - Iteration, using the syntax

           {=for[foo:foos]=}<h2>{=foo=}</h2>{=endfor=}

       If <variables> has an attribute <foos>, and it is a non-empty array,
       then the material inside the for block is repeated for each element
       of <foos>, replacing {=foo=} with the current element each time. 
       If <foos> does not exist or is not an array, the expression will be
       removed in the expanded template.

       - Conditional inclusion, using the syntax

           {=if[foo]=}bar{=endif=}

       If <variables> has an attribute <foo> and its value is <true>, then
       the whole expression will be replaced with 'bar'. Otherwise the
       expression will be removed in the expanded template.

       - Variable substitution, with variable names indicated by
       surrounding them with {= and =}, e.g., '{=foo=}'. If there is a <foo> 
       attribute on <variables> that has the value 'bar', then '{=foo=}' in 
       the template would become 'bar' after expansion. 

    */
    
    static expand (templateName, variables) {

	if(!(templateName in this.templates)){
	    throw new ConfigError('Template ' + templateName + ' does not exist');
	}

	var template = this.templates[templateName];

	// iteration
	template = template.replace(new RegExp('{=for\\[([-_a-zA-Z0-9]+):([-_a-zA-Z0-9]+)\\]=}([^]*){=endfor=}','g'), (match, p1, p2, p3) => p2 in variables && Array.isArray(variables[p2]) ? variables[p2].reduce((previous, current) => previous + p3.replaceAll(`{=${p1}=}`, current), '') : '');
	
	// conditional inclusion
	template = template.replace(new RegExp('{=if\\[([-_a-zA-Z0-9]+)\\]=}([^]*){=endif=}','g'), (match, p1, p2) => p1 in variables && variables[p1] ? p2 : '');

	// variable substitution
	template = template.replace(new RegExp('{=([-_a-zA-Z0-9]+)=}','g'), (match, p1) => p1 in variables ? variables[p1] : '');

        var temp_div = document.createElement('div');
        temp_div.innerHTML = template;
        return temp_div.firstChild;

    } // expand

    /**************************************************************************/

} // TemplateManager

export default TemplateManager;