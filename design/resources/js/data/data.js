{{project.js_copyright_notice}}

import config from '{{project.site_path}}/js/config.js?v={{project.version}}';
import DataManager from '{{project.site_path}}/js/data/DataManager.js?v={{project.version}}';

function initialize () {
    
    DataManager.configure(config.getConfig('data'));

} // initialize

/******************************************************************************/

config.registerModule('data', initialize);
