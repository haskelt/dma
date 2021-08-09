// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger/logger.js?v=0.18.0-beta';

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