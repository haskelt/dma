// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import config from '../config.js?v=0.22.1-beta';
import logger from '../logger/logger.js?v=0.22.1-beta';
import TaskSequence from './TaskSequence.js?v=0.22.1-beta';

function initialize () {
    logger.postMessage('DEBUG', 'tasks', 'Initializing tasks module');
    new TaskSequence(document.querySelector('#task-sequence'));
    return Promise.resolve(true);
}

config.registerModule('tasks', initialize);

