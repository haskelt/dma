{{globals.js_copyright_notice}}

import config from '{{globals.site_path}}/js/config.js?v={{globals.version}}';
import StudentSelectorDialog from '{{globals.site_path}}/js/dialogs/StudentSelectorDialog.js?v={{globals.version}}';

function initialize () {

    StudentSelectorDialog.initialize();

} // initialize

config.registerModule('dialogs', initialize);
