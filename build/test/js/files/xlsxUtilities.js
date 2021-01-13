// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';
import xlsxReader from '/js/files/xlsxReader.js';

class xlsxUtilities {

    /**************************************************************************/

    static read (fileObject, callback) {

	new xlsxReader().read(fileObject, callback);

    } // read

    /**************************************************************************/

    static write (data, file) {

	var workbook = XLSX.utils.book_new();
	for(let tag in data){
	    workbook.Sheets[tag] = XLSX.utils.json_to_sheet(data[tag]);
	    workbook.SheetNames.push(tag);
	}
	XLSX.writeFile(workbook, 'test.xlsx');
	
    } // write
    
    /**************************************************************************/
    
} // xlsxUtilities

export default xlsxUtilities;

