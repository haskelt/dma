import TaskFactory from '/js/tasks/TaskFactory.js';
import ToggleObject from '/js/fields/ToggleObject.js';
import TextInputObject from '/js/fields/TextInputObject.js';
import MultipleChoiceObject from '/js/fields/MultipleChoiceObject.js';
import FileSelectorObject from '/js/fields/FileSelectorObject.js';
import ValidationObject from '/js/fields/ValidationObject.js';

TaskFactory.registerBuilder('toggle', ToggleObject);
TaskFactory.registerBuilder('text-input', TextInputObject);
TaskFactory.registerBuilder('multiple-choice', MultipleChoiceObject);
TaskFactory.registerBuilder('file-selector', FileSelectorObject);
TaskFactory.registerBuilder('validation', ValidationObject);