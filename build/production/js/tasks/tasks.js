// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import config from '/dma/js/config.js?v=0.18.1-beta';
import TaskSet from '/dma/js/tasks/TaskSet.js?v=0.18.1-beta';
import TaskSequence from '/dma/js/tasks/TaskSequence.js?v=0.18.1-beta';
import TaskFactory from '/dma/js/tasks/TaskFactory.js?v=0.18.1-beta';

function initialize () {
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
}

config.registerModule('tasks', initialize);

