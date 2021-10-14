{{globals.js_copyright_notice}}

import config from '../config.js?v={{globals.version}}';
import logger from '../logger/logger.js?v={{globals.version}}';
import StudentSelectorDialog from './StudentSelectorDialog.js?v={{globals.version}}';

function initialize () {

    logger.postMessage('DEBUG', 'data', 'Initializing dialogs module');
    StudentSelectorDialog.initialize();
    return Promise.resolve(true);

} // initialize

/******************************************************************************/

config.registerModule('dialogs', initialize);
