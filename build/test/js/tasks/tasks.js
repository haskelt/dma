// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import config from '../config.js?v=0.22.1-beta';
import logger from '../logger/logger.js?v=0.22.1-beta';
import ConfigError from '../errors/ConfigError.js?v=0.22.1-beta';
import TemplateManager from '../templates/TemplateManager.js?v=0.22.1-beta';
import TaskSet from './TaskSet.js?v=0.22.1-beta';
import TaskSequence from './TaskSequence.js?v=0.22.1-beta';
import TaskFactory from './TaskFactory.js?v=0.22.1-beta';

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

