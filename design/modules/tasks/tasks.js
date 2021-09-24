{{globals.js_copyright_notice}}

import config from '../config.js?v={{globals.version}}';
import logger from '../logger/logger.js?v={{globals.version}}';
import TaskSet from './TaskSet.js?v={{globals.version}}';
import TaskSequence from './TaskSequence.js?v={{globals.version}}';
import TaskFactory from './TaskFactory.js?v={{globals.version}}';

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


