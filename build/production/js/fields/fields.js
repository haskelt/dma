// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import config from '/dma/js/config.js?v=0.17.2-beta';
import TaskFactory from '/dma/js/tasks/TaskFactory.js?v=0.17.2-beta';
import ToggleTask from '/dma/js/fields/ToggleTask.js?v=0.17.2-beta';
import TextInputTask from '/dma/js/fields/TextInputTask.js?v=0.17.2-beta';
import MultipleChoiceTask from '/dma/js/fields/MultipleChoiceTask.js?v=0.17.2-beta';
import SelectTask from '/dma/js/fields/SelectTask.js?v=0.17.2-beta';
import SpreadsheetSelectorTask from '/dma/js/fields/SpreadsheetSelectorTask.js?v=0.17.2-beta';
import ExportButtonTask from '/dma/js/fields/ExportButtonTask.js?v=0.17.2-beta';

function initialize () {
    TaskFactory.registerBuilder('toggle', ToggleTask);
    TaskFactory.registerBuilder('text-input', TextInputTask);
    TaskFactory.registerBuilder('multiple-choice', MultipleChoiceTask);
    TaskFactory.registerBuilder('select', SelectTask);
    TaskFactory.registerBuilder('spreadsheet-selector', SpreadsheetSelectorTask);
    TaskFactory.registerBuilder('export-button', ExportButtonTask);
}

config.registerModule('fields', initialize);

