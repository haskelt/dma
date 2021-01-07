import TaskSetObject from '{{ SITE_PATH }}/js/tasks/TaskSetObject.js';
import TaskSequenceObject from '{{ SITE_PATH }}/js/tasks/TaskSequenceObject.js';
import TaskFactory from '{{ SITE_PATH }}/js/tasks/TaskFactory.js';

for (let sequenceElement of document.querySelectorAll('.tasks__task-sequence')) {
    let sequence = new TaskSequenceObject(sequenceElement, null);
    for (let taskSetElement of sequenceElement.querySelectorAll('.tasks__task-set')){
	let taskSet = new TaskSetObject(taskSetElement);
	sequence.addChild(taskSet);
	taskSet.setParent(sequence);
	for (let taskElement of taskSetElement.querySelectorAll('.tasks__task')){
	    let task = TaskFactory.build(taskElement.dataset.taskType, taskElement);
	    taskSet.addChild(task);
	    task.setParent(taskSet);
	}
    }
}


