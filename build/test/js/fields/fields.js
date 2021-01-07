import TaskFactory from '/js/tasks/TaskFactory.js';
import ToggleObject from '/js/fields/ToggleObject.js';
import TextInputObject from '/js/fields/TextInputObject.js';
import MultipleChoiceObject from '/js/fields/MultipleChoiceObject.js';
import FileSelectorObject from '/js/fields/FileSelectorObject.js';

TaskFactory.registerBuilder('toggle', ToggleObject);
TaskFactory.registerBuilder('text-input', TextInputObject);
TaskFactory.registerBuilder('multiple-choice', MultipleChoiceObject);
TaskFactory.registerBuilder('file-selector', FileSelectorObject);