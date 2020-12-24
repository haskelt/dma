// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

class DialogSelector {

    static initialize (file_uploader) {

	DialogSelector.file_uploader = file_uploader;
	for (let selector of document.querySelectorAll('.file-selectors__dialog-selector')) {
	    console.log('adding selector');
	    new DialogSelector(selector);
	}
	
    } // constructor
    
/*****************************************************************************/

    constructor (element) {

	this.input = element.querySelector('.file-selectors__dialog-selector--input');
	this.button = element.querySelector('.file-selectors__dialog-selector--button');
	this.button.addEventListener('click', this.handleUpload.bind(this));
	
    } // constructor
    
/*****************************************************************************/

    handleUpload (e) {

	DialogSelector.file_uploader(this.input.files[0]);

    } // handleClick
    
/*****************************************************************************/
    
} // DialogSelector

export default DialogSelector;