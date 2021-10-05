{{globals.js_copyright_notice}}

import config from '../config.js?v={{globals.version}}';
import logger from '../logger/logger.js?v={{globals.version}}';
import ConfigError from '../errors/ConfigError.js?v={{globals.version}}';
import TemplateManager from '../templates/TemplateManager.js?v={{globals.version}}';
import TaskSequence from './TaskSequence.js?v={{globals.version}}';

/******************************************************************************/

function initialize () {
    logger.postMessage('DEBUG', 'tasks', 'Initializing tasks module');

    // build the task layout in the DOM
    var taskSequenceElement = document.querySelector('#task-sequence');
    config.getConfig('layout').forEach(layoutSpecs => taskSequenceElement.appendChild(buildLayoutElement(layoutSpecs)));

    // build the JS task objects 
    new TaskSequence(taskSequenceElement);

    return Promise.resolve(true);
    
} // initialize

/******************************************************************************/

function buildLayoutElement (layoutSpecs){

    var layoutElement = TemplateManager.expand(layoutSpecs.template, layoutSpecs.parameters);
    if('children' in layoutSpecs){
	var childContainer = layoutElement.querySelector('.tasks__task-set--subtasks');
	if(!childContainer){
	    throw new ConfigError('Attempt to add children to template ' + layoutSpecs.template + ', but that template does not permit children');
	}
	for(let child of layoutSpecs.children){
	    var childElement = buildLayoutElement(child);
	    childContainer.appendChild(childElement);
	}
    }
    return layoutElement;
    
} // buildLayoutElement

/******************************************************************************/

config.registerModule('tasks', initialize);


