// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import DialogSelector from '/js/DialogSelector.js';

class FileSelector {

/******************************************************************************/

    constructor () {

	for (let selector of document.querySelectorAll('.file-selectors__dialog-selector')) {
	    console.log('adding selector');
	    new DialogSelector(selector);
	}
	
    } // constructor
    

/******************************************************************************/

} // FileSelector

export default new FileSelector();