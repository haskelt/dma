// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import config from '/js/config.js?v=0.21.1-beta';
import TaskFactory from '/js/tasks/TaskFactory.js?v=0.21.1-beta';
import ToggleTask from '/js/fields/ToggleTask.js?v=0.21.1-beta';
import TextInputTask from '/js/fields/TextInputTask.js?v=0.21.1-beta';
import MultipleChoiceTask from '/js/fields/MultipleChoiceTask.js?v=0.21.1-beta';
import SelectTask from '/js/fields/SelectTask.js?v=0.21.1-beta';
import SpreadsheetSelectorTask from '/js/fields/SpreadsheetSelectorTask.js?v=0.21.1-beta';
import ExportButtonTask from '/js/fields/ExportButtonTask.js?v=0.21.1-beta';

function initialize () {
    TaskFactory.registerBuilder('toggle', ToggleTask);
    TaskFactory.registerBuilder('text-input', TextInputTask);
    TaskFactory.registerBuilder('multiple-choice', MultipleChoiceTask);
    TaskFactory.registerBuilder('select', SelectTask);
    TaskFactory.registerBuilder('spreadsheet-selector', SpreadsheetSelectorTask);
    TaskFactory.registerBuilder('export-button', ExportButtonTask);
}

config.registerModule('fields', initialize);

