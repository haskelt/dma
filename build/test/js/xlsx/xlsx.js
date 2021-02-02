// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import sheetjs from '/js/sheetjs/xlsx.full.min.js?v=0.6.0-beta';
import logger from '/js/logger/logger.js?v=0.6.0-beta';
import xlsxReader from '/js/xlsx/xlsxReader.js?v=0.6.0-beta';

class XLSX {

    /**************************************************************************/

    static read (fileObject, callback) {

	new xlsxReader().read(fileObject, callback);

    } // read

    /**************************************************************************/

    static sheetToJSON (sheet, config) {

	return sheetjs.utils.sheet_to_json(sheet, config);
	
    } // workbookToJSON
    
    /**************************************************************************/
    
    static write (data, file) {

	var workbook = sheetjs.utils.book_new();
	for(let tag in data){
	    workbook.Sheets[tag] = sheetjs.utils.json_to_sheet(data[tag]);
	    workbook.SheetNames.push(tag);
	}
	sheetjs.writeFile(workbook, file);
	
    } // write

    /**************************************************************************/

    static decodeRange (rangeString) {

	return sheetjs.utils.decode_range(rangeString);

    } // decodeRange
	
    /**************************************************************************/

    static encodeAddress (addressObject) {

	return sheetjs.utils.encode_cell(addressObject);
	
    } // encodeAddress
    
    /**************************************************************************/
    
} // XLSX

export default XLSX;

