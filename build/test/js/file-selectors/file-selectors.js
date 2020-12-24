// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import DialogSelector from '/js/file-selectors/DialogSelector.js';

class FileSelectors {

/******************************************************************************/

    constructor () {

	for (let selector of document.querySelectorAll('.file-selectors__dialog-selector')) {
	    console.log('adding selector');
	    new DialogSelector(selector);
	}
	
    } // constructor
    

/******************************************************************************/

} // FileSelectors

export default new FileSelectors();