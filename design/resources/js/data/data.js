{{globals.js_copyright_notice}}

import config from '{{globals.site_path}}/js/config.js?v={{globals.version}}';
import DataManager from '{{globals.site_path}}/js/data/DataManager.js?v={{globals.version}}';

function initialize () {
    
    DataManager.initialize();

} // initialize

/******************************************************************************/

config.registerModule('data', initialize);
