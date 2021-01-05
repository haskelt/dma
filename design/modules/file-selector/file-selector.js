import TaskBuilder from '{{ SITE_PATH }}/js/task-sequence/TaskBuilder.js';
import FileSelectorObject from '{{ SITE_PATH }}/js/task-sequence/FileSelectorObject.js';

TaskBuilder.registerBuilder('file-selector', FileSelectorObject);
