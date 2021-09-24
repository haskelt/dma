// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import config from '../config.js?v=0.22.1-beta';
import logger from '../logger/logger.js?v=0.22.1-beta';
import TaskSet from './TaskSet.js?v=0.22.1-beta';
import TaskSequence from './TaskSequence.js?v=0.22.1-beta';
import TaskFactory from './TaskFactory.js?v=0.22.1-beta';

function initialize () {
    logger.postMessage('DEBUG', 'tasks', 'Initializing tasks module');
    for (let taskSequenceElement of document.querySelectorAll('.tasks__task-sequence')) {
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

