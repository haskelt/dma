{{project.js_copyright_notice}}

import config from '{{project.site_path}}/js/config.js?v={{project.version}}';
import TaskSet from '{{project.site_path}}/js/tasks/TaskSet.js?v={{project.version}}';
import TaskSequence from '{{project.site_path}}/js/tasks/TaskSequence.js?v={{project.version}}';
import TaskFactory from '{{project.site_path}}/js/tasks/TaskFactory.js?v={{project.version}}';

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


