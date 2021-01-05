// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

class FileSelectorObject {
    
/*****************************************************************************/

    constructor (element) {

	this.input = element.querySelector('.file-selector__input');
	this.button = element.querySelector('.file-selector__button');
	this.button.addEventListener('click', this.handleClick.bind(this));
	
    } // constructor
    
/*****************************************************************************/

    handleClick (e) {

	//DialogSelector.file_uploader(this.input.files[0]);
	console.log('got click!');

    } // handleClick
    
/*****************************************************************************/
    
} // FileSelectorObject

export default FileSelectorObject;