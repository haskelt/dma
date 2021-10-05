/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import logger from '../logger/logger.js?v=0.26.0-beta';

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