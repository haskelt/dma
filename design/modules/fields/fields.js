{{globals.js_copyright_notice}}

import config from '{{globals.site_path}}/js/config.js?v={{globals.version}}';
import TaskFactory from '{{globals.site_path}}/js/tasks/TaskFactory.js?v={{globals.version}}';
import ToggleTask from '{{globals.site_path}}/js/fields/ToggleTask.js?v={{globals.version}}';
import TextInputTask from '{{globals.site_path}}/js/fields/TextInputTask.js?v={{globals.version}}';
import MultipleChoiceTask from '{{globals.site_path}}/js/fields/MultipleChoiceTask.js?v={{globals.version}}';
import SelectTask from '{{globals.site_path}}/js/fields/SelectTask.js?v={{globals.version}}';
import SpreadsheetSelectorTask from '{{globals.site_path}}/js/fields/SpreadsheetSelectorTask.js?v={{globals.version}}';
import ExportButtonTask from '{{globals.site_path}}/js/fields/ExportButtonTask.js?v={{globals.version}}';

function initialize () {
    TaskFactory.registerBuilder('toggle', ToggleTask);
    TaskFactory.registerBuilder('text-input', TextInputTask);
    TaskFactory.registerBuilder('multiple-choice', MultipleChoiceTask);
    TaskFactory.registerBuilder('select', SelectTask);
    TaskFactory.registerBuilder('spreadsheet-selector', SpreadsheetSelectorTask);
    TaskFactory.registerBuilder('export-button', ExportButtonTask);
}

config.registerModule('fields', initialize);


