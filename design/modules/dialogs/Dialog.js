{{globals.js_copyright_notice}}

import logger from '{{globals.site_path}}/js/logger/logger.js?v={{globals.version}}';

class Dialog {

    /**************************************************************************/

    static show () {

	console.log("showing");
	this.element.classList.remove("hidden");
	
    } // show

    /**************************************************************************/

    static hide () {

	console.log("hiding");
	this.element.classList.add("hidden");
	
    } // hide

    /**************************************************************************/
    
} // Dialog

export default Dialog;
