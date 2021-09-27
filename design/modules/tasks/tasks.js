{{globals.js_copyright_notice}}

import config from '../config.js?v={{globals.version}}';
import logger from '../logger/logger.js?v={{globals.version}}';
import ConfigError from '../errors/ConfigError.js?v={{globals.version}}';
import TemplateManager from '../templates/TemplateManager.js?v={{globals.version}}';
import TaskSet from './TaskSet.js?v={{globals.version}}';
import TaskSequence from './TaskSequence.js?v={{globals.version}}';
import TaskFactory from './TaskFactory.js?v={{globals.version}}';

function buildTask (taskSpecs){

    var taskElement = TemplateManager.expand(taskSpecs.template, taskSpecs.parameters);
    if('children' in taskSpecs){
	var childContainer = taskElement.querySelector('.tasks__child-tasks');
	if(!childContainer){
	    throw new ConfigError('Attempt to add children to template ' + taskSpecs.template + ', but that template does not permit children');
	}
	for(let child of taskSpecs.children){
	    var childElement = buildTask(child);
	    childContainer.appendChild(childElement);
	}
    }
    return taskElement;

} // buildTask

function initialize () {
    logger.postMessage('DEBUG', 'tasks', 'Initializing tasks module');
    for (let taskSequenceElement of document.querySelectorAll('.tasks__task-sequence')) {
	for(let taskSpecs of config.getConfig('layout')){
	    let taskElement = buildTask(taskSpecs);
	    taskSequenceElement.appendChild(taskElement);
	}
	let taskSequence = new TaskSequence(taskSequenceElement, null);
	for (let taskSetElement of taskSequenceElement.querySelectorAll('.tasks__task-set')){
	    let taskSet = new TaskSet(taskSetElement);
	    taskSequence.addChild(taskSet);
	    taskSet.setParent(taskSequence);
	    for (let taskElement of taskSetElement.querySelectorAll('.tasks__task')){
		let task = TaskFactory.build(taskElement.dataset.taskType, taskElement);
		taskSet.addChild(task);
		task.setParent(taskSet);
	    }
	}
	taskSequence.setup();
    }
    return Promise.resolve(true);
}

config.registerModule('tasks', initialize);


