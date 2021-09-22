{{globals.js_copyright_notice}}

import config from '../config.js?v={{globals.version}}';
import StudentSelectorDialog from './StudentSelectorDialog.js?v={{globals.version}}';

function initialize () {

    StudentSelectorDialog.initialize();

} // initialize

config.registerModule('dialogs', initialize);
