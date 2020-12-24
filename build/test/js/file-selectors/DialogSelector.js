// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

class DialogSelector {
    
/*****************************************************************************/

    constructor (element) {

	this.input = element.querySelector('.file-selectors__dialog-selector--input');
	this.button = element.querySelector('.file-selectors__dialog-selector--button');
	this.button.addEventListener('click', this.handleClick.bind(this));
	
    } // constructor
    
/*****************************************************************************/

    handleClick (e) {

	console.log('I got clicked!')
 
        //Validate whether File is valid Excel file.
        var regex = /(.xls|.xlsx)$/;
	console.log('file path: ' + this.input.value);
        if (regex.test(this.input.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
 
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        //GetTableFromExcel(e.target.result);
			console.log('loaded file from OS');
                    };
                    reader.readAsBinaryString(this.input.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        //GetTableFromExcel(data);
			console.log('loaded file from OS');
                    };
                    reader.readAsArrayBuffer(this.input.files[0]);
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid Excel file.");
        }

    } // handleClick
    
/*****************************************************************************/

} // DialogSelector

export default DialogSelector;