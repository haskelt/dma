{{ JS_COPYRIGHT_NOTICE }}

import sheetjs from '{{SITE_PATH}}/js/sheetjs/xlsx.full.min.js';
import logger from '{{ SITE_PATH }}/js/logger.js';
import xlsxReader from '{{ SITE_PATH }}/js/xlsx/xlsxReader.js';

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


