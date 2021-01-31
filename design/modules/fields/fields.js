{{ JS_COPYRIGHT_NOTICE }}

import TaskFactory from '{{ SITE_PATH }}/js/tasks/TaskFactory.js?v={{VERSION}}';
import ToggleTask from '{{ SITE_PATH }}/js/fields/ToggleTask.js?v={{VERSION}}';
import TextInputTask from '{{ SITE_PATH }}/js/fields/TextInputTask.js?v={{VERSION}}';
import MultipleChoiceTask from '{{ SITE_PATH }}/js/fields/MultipleChoiceTask.js?v={{VERSION}}';
import SelectTask from '{{ SITE_PATH }}/js/fields/SelectTask.js?v={{VERSION}}';
import SpreadsheetSelectorTask from '{{ SITE_PATH }}/js/fields/SpreadsheetSelectorTask.js?v={{VERSION}}';
import ExportButtonTask from '{{ SITE_PATH }}/js/fields/ExportButtonTask.js?v={{VERSION}}';

TaskFactory.registerBuilder('toggle', ToggleTask);
TaskFactory.registerBuilder('text-input', TextInputTask);
TaskFactory.registerBuilder('multiple-choice', MultipleChoiceTask);
TaskFactory.registerBuilder('select', SelectTask);
TaskFactory.registerBuilder('spreadsheet-selector', SpreadsheetSelectorTask);
TaskFactory.registerBuilder('export-button', ExportButtonTask);
