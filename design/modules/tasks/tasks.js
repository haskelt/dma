{{globals.js_copyright_notice}}

import config from '{{globals.site_path}}/js/config.js?v={{globals.version}}';
import TaskSet from '{{globals.site_path}}/js/tasks/TaskSet.js?v={{globals.version}}';
import TaskSequence from '{{globals.site_path}}/js/tasks/TaskSequence.js?v={{globals.version}}';
import TaskFactory from '{{globals.site_path}}/js/tasks/TaskFactory.js?v={{globals.version}}';

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


