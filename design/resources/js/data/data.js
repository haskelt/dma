{{globals.js_copyright_notice}}

import config from '../config.js?v={{globals.version}}';
import DataManager from './DataManager.js?v={{globals.version}}';

function initialize () {
    
    DataManager.initialize();

} // initialize

/******************************************************************************/

config.registerModule('data', initialize);
