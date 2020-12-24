// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

class FileReader {

/*****************************************************************************/

    static read_file (file_object) {

	//Validate whether File is valid Excel file.
        var regex = /(.xls|.xlsx)$/;
	console.log('file path: ' + file_object.name);
        if (regex.test(file_object.name.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
 
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        //GetTableFromExcel(e.target.result);
			console.log('loaded file from OS');
                    };
                    reader.readAsBinaryString(file_object);
                } else {
		    alert("This app doesn't work on Internet Explorer");
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please choose a valid Excel file.");
        }
	
    } // read_file
    
/*****************************************************************************/

} // FileReader

export default FileReader;

