{{ JS_COPYRIGHT_NOTICE }}

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
