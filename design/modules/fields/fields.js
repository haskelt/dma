{{ JS_COPYRIGHT_NOTICE }}

import TaskFactory from '{{ SITE_PATH }}/js/tasks/TaskFactory.js';
import ToggleTask from '{{ SITE_PATH }}/js/fields/ToggleTask.js';
import TextInputTask from '{{ SITE_PATH }}/js/fields/TextInputTask.js';
import MultipleChoiceTask from '{{ SITE_PATH }}/js/fields/MultipleChoiceTask.js';
import SelectTask from '{{ SITE_PATH }}/js/fields/SelectTask.js';
import SpreadsheetSelectorTask from '{{ SITE_PATH }}/js/fields/SpreadsheetSelectorTask.js';
import ExportButtonTask from '{{ SITE_PATH }}/js/fields/ExportButtonTask.js';

TaskFactory.registerBuilder('toggle', ToggleTask);
TaskFactory.registerBuilder('text-input', TextInputTask);
TaskFactory.registerBuilder('multiple-choice', MultipleChoiceTask);
TaskFactory.registerBuilder('select', SelectTask);
TaskFactory.registerBuilder('spreadsheet-selector', SpreadsheetSelectorTask);
TaskFactory.registerBuilder('export-button', ExportButtonTask);
