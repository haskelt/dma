// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import config from '../config.js?v=0.22.1-beta';
import logger from '../logger/logger.js?v=0.22.1-beta';
import TaskFactory from '../tasks/TaskFactory.js?v=0.22.1-beta';
import ToggleTask from './ToggleTask.js?v=0.22.1-beta';
import TextInputTask from './TextInputTask.js?v=0.22.1-beta';
import MultipleChoiceTask from './MultipleChoiceTask.js?v=0.22.1-beta';
import SelectTask from './SelectTask.js?v=0.22.1-beta';
import SpreadsheetSelectorTask from './SpreadsheetSelectorTask.js?v=0.22.1-beta';
import ExportButtonTask from './ExportButtonTask.js?v=0.22.1-beta';

function initialize () {
    logger.postMessage('DEBUG', 'fields', 'Initializing fields module');
    TaskFactory.registerBuilder('toggle', ToggleTask);
    TaskFactory.registerBuilder('text-input', TextInputTask);
    TaskFactory.registerBuilder('multiple-choice', MultipleChoiceTask);
    TaskFactory.registerBuilder('select', SelectTask);
    TaskFactory.registerBuilder('spreadsheet-selector', SpreadsheetSelectorTask);
    TaskFactory.registerBuilder('export-button', ExportButtonTask);
    return Promise.resolve(true);
}

config.registerModule('fields', initialize);

