{{project.js_copyright_notice}}

import config from '{{project.site_path}}/js/config.js?v={{project.version}}';
import TaskFactory from '{{project.site_path}}/js/tasks/TaskFactory.js?v={{project.version}}';
import ToggleTask from '{{project.site_path}}/js/fields/ToggleTask.js?v={{project.version}}';
import TextInputTask from '{{project.site_path}}/js/fields/TextInputTask.js?v={{project.version}}';
import MultipleChoiceTask from '{{project.site_path}}/js/fields/MultipleChoiceTask.js?v={{project.version}}';
import SelectTask from '{{project.site_path}}/js/fields/SelectTask.js?v={{project.version}}';
import SpreadsheetSelectorTask from '{{project.site_path}}/js/fields/SpreadsheetSelectorTask.js?v={{project.version}}';
import ExportButtonTask from '{{project.site_path}}/js/fields/ExportButtonTask.js?v={{project.version}}';

function initialize () {
    TaskFactory.registerBuilder('toggle', ToggleTask);
    TaskFactory.registerBuilder('text-input', TextInputTask);
    TaskFactory.registerBuilder('multiple-choice', MultipleChoiceTask);
    TaskFactory.registerBuilder('select', SelectTask);
    TaskFactory.registerBuilder('spreadsheet-selector', SpreadsheetSelectorTask);
    TaskFactory.registerBuilder('export-button', ExportButtonTask);
}

config.registerModule('fields', initialize);


