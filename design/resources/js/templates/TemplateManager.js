{{globals.js_copyright_notice}}

import utilities from '../utilities.js?v={{globals.version}}';
import logger from '../logger/logger.js?v={{globals.version}}';
import ConfigError from '../errors/ConfigError.js?v={{globals.version}}';

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

    /* <template> should be a string of HTML, with variable names indicated by
       surrounding them with {= and =}, e.g., '{=foo=}'. <variables> is an 
       object holding the values for each variable in the template, e.g.,
       there would be a 'foo' attribute on <variables> that might have the
       value 'bar'. Then '{=foo=}' in the template would become 'bar' after
       expansion. */
    
    static expand (templateName, variables) {

	if(!(templateName in this.templates)){
	    throw new ConfigError('Template ' + templateName + ' does not exist');
	}

	var split_template = this.templates[templateName].split(/{=|=}/);
        for(let i = 0; i < split_template.length; i++){
            if(i % 2 == 1){
                split_template[i] = variables[split_template[i]];
            }
        }
        var temp_div = document.createElement('div');
        temp_div.innerHTML = split_template.join('');
        return temp_div.firstChild;

    } // expand

    /**************************************************************************/

} // TemplateManager

export default TemplateManager;
