/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import config from '../config.js?v=0.24.2-beta';
import logger from '../logger/logger.js?v=0.24.2-beta';
import TemplateManager from '../templates/TemplateManager.js?v=0.24.2-beta';

function initialize () {

    logger.postMessage('DEBUG', 'templates', 'Initializing templates module');
    return TemplateManager.initialize();
    
} // initialize

config.registerModule('templates', initialize);

