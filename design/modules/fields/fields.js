import TaskFactory from '{{ SITE_PATH }}/js/tasks/TaskFactory.js';
import ToggleObject from '{{ SITE_PATH }}/js/fields/ToggleObject.js';
import TextInputObject from '{{ SITE_PATH }}/js/fields/TextInputObject.js';
import MultipleChoiceObject from '{{ SITE_PATH }}/js/fields/MultipleChoiceObject.js';
import FileSelectorObject from '{{ SITE_PATH }}/js/fields/FileSelectorObject.js';

TaskFactory.registerBuilder('toggle', ToggleObject);
TaskFactory.registerBuilder('text-input', TextInputObject);
TaskFactory.registerBuilder('multiple-choice', MultipleChoiceObject);
TaskFactory.registerBuilder('file-selector', FileSelectorObject);
