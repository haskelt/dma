{{ JS_COPYRIGHT_NOTICE }}

import TaskSet from '{{ SITE_PATH }}/js/tasks/TaskSet.js?v={{VERSION}}';
import TaskSequence from '{{ SITE_PATH }}/js/tasks/TaskSequence.js?v={{VERSION}}';
import TaskFactory from '{{ SITE_PATH }}/js/tasks/TaskFactory.js?v={{VERSION}}';

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


