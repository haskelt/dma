{{globals.js_copyright_notice}}

import config from '../config.js?v={{globals.version}}';
import logger from '../logger/logger.js?v={{globals.version}}';
import TemplateManager from '../templates/TemplateManager.js?v={{globals.version}}';

function initialize () {

    logger.postMessage('DEBUG', 'templates', 'Initializing templates module');
    return TemplateManager.initialize();
    
} // initialize

config.registerModule('templates', initialize);


