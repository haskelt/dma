{{globals.js_copyright_notice}}

import config from '../config.js?v={{globals.version}}';
import logger from '../logger/logger.js?v={{globals.version}}';
import TaskSequence from './TaskSequence.js?v={{globals.version}}';

function initialize () {
    logger.postMessage('DEBUG', 'tasks', 'Initializing tasks module');
    new TaskSequence(document.querySelector('#task-sequence'));
    return Promise.resolve(true);
}

config.registerModule('tasks', initialize);


