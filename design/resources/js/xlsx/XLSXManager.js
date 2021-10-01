{{globals.js_copyright_notice}}

import sheetjs from '../sheetjs/xlsx.full.min.js?v={{globals.version}}';
import logger from '../logger/logger.js?v={{globals.version}}';
import xlsxReader from './xlsxReader.js?v={{globals.version}}';

class XLSXManager {

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
    
} // XLSXManager

export default XLSXManager;
