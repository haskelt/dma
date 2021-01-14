// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import TaskFactory from '/dma/js/tasks/TaskFactory.js';
import ToggleTask from '/dma/js/fields/ToggleTask.js';
import TextInputTask from '/dma/js/fields/TextInputTask.js';
import MultipleChoiceTask from '/dma/js/fields/MultipleChoiceTask.js';
import SpreadsheetSelectorTask from '/dma/js/fields/SpreadsheetSelectorTask.js';
import ExportButtonTask from '/dma/js/fields/ExportButtonTask.js';

TaskFactory.registerBuilder('toggle', ToggleTask);
TaskFactory.registerBuilder('text-input', TextInputTask);
TaskFactory.registerBuilder('multiple-choice', MultipleChoiceTask);
TaskFactory.registerBuilder('spreadsheet-selector', SpreadsheetSelectorTask);
TaskFactory.registerBuilder('export-button', ExportButtonTask);