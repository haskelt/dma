import TaskObject from '{{ SITE_PATH }}/js/task-sequence/TaskObject.js';
import TaskSetObject from '{{ SITE_PATH }}/js/task-sequence/TaskSetObject.js';
import TaskSequenceObject from '{{ SITE_PATH }}/js/task-sequence/TaskSequenceObject.js';

for (let sequenceElement of document.querySelectorAll('.task-sequence')) {
    let sequence = new TaskSequenceObject(sequenceElement, null);
    for (let taskSetElement of sequenceElement.querySelectorAll('.task-sequence__task-set')){
	let taskSet = new TaskSetObject(taskElement);
	sequence.addChild(taskSet);
	taskSet.setParent(sequence);
	for (let taskElement of taskSetElement.querySelectorAll('.task-sequence__task')){
	    let task = new TaskObject(taskElement, taskSetElement);
	    taskSet.addChild(task);
	    task.setParent(taskSet);
	}
    }
}


