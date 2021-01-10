// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import TaskFactory from '/js/tasks/TaskFactory.js';
import ToggleTask from '/js/fields/ToggleTask.js';
import TextInputTask from '/js/fields/TextInputTask.js';
import MultipleChoiceTask from '/js/fields/MultipleChoiceTask.js';
import SpreadsheetSelectorTask from '/js/fields/SpreadsheetSelectorTask.js';
import ValidationTask from '/js/fields/ValidationTask.js';

TaskFactory.registerBuilder('toggle', ToggleTask);
TaskFactory.registerBuilder('text-input', TextInputTask);
TaskFactory.registerBuilder('multiple-choice', MultipleChoiceTask);
TaskFactory.registerBuilder('spreadsheet-selector', SpreadsheetSelectorTask);
TaskFactory.registerBuilder('validation', ValidationTask);