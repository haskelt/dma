{{globals.js_copyright_notice}}

import logger from '../logger/logger.js?v={{globals.version}}';

class Dialog {

    /**************************************************************************/

    static show () {

	this.element.classList.remove("hidden");
	
    } // show

    /**************************************************************************/

    static hide () {

	this.element.classList.add("hidden");
	
    } // hide

    /**************************************************************************/
    
} // Dialog

export default Dialog;
