{{ JS_COPYRIGHT_NOTICE }}

// DEPENDS ON XLSX
import logger from '{{ SITE_PATH }}/js/logger.js';
import xlsxReader from '{{ SITE_PATH }}/js/files/xlsxReader.js';

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
	XLSX.writeFile(workbook, file);
	
    } // write
    
    /**************************************************************************/
    
} // xlsxUtilities

export default xlsxUtilities;


