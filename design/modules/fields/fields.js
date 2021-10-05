{{globals.js_copyright_notice}}

import config from '../config.js?v={{globals.version}}';
import logger from '../logger/logger.js?v={{globals.version}}';
import TaskFactory from '../tasks/TaskFactory.js?v={{globals.version}}';
import TextInputTask from './TextInputTask.js?v={{globals.version}}';
import MultipleChoiceTask from './MultipleChoiceTask.js?v={{globals.version}}';
import SelectTask from './SelectTask.js?v={{globals.version}}';
import SpreadsheetSelectorTask from './SpreadsheetSelectorTask.js?v={{globals.version}}';
import PrepareDataTask from './PrepareDataTask.js?v={{globals.version}}';
import ExportButtonTask from './ExportButtonTask.js?v={{globals.version}}';
import WarningBoxTask from './WarningBoxTask.js?v={{globals.version}}';

function initialize () {
    logger.postMessage('DEBUG', 'fields', 'Initializing fields module');
    TaskFactory.registerBuilder('text-input', TextInputTask);
    TaskFactory.registerBuilder('multiple-choice', MultipleChoiceTask);
    TaskFactory.registerBuilder('select', SelectTask);
    TaskFactory.registerBuilder('spreadsheet-selector', SpreadsheetSelectorTask);
    TaskFactory.registerBuilder('prepare-data', PrepareDataTask);
    TaskFactory.registerBuilder('warning-box', WarningBoxTask);
    TaskFactory.registerBuilder('export-button', ExportButtonTask);

    return Promise.resolve(true);
}

config.registerModule('fields', initialize);


