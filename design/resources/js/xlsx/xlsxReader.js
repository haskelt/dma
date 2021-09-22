{{globals.js_copyright_notice}}

import sheetjs from '../sheetjs/xlsx.full.min.js?v={{globals.version}}';
import logger from '../logger/logger.js?v={{globals.version}}';

class xlsxReader {

    /**************************************************************************/

    read (fileObject, callback) {

        if (typeof (FileReader) != 'undefined') {
	    this.callback = callback;
            var reader = new FileReader();
            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = this.finishRead.bind(this);                     
                reader.readAsBinaryString(fileObject);
            } else {
		logger.postMessage('ERROR', 'xlsx', 'This app does not work on Internet Explorer');
            }
        } else {
            logger.postMessage('ERROR', 'xlsx', 'This app does not work on browsers without HTML5 support.');
        }
	
    } // read
    
    /**************************************************************************/

    finishRead (e) {

	/* We have the try/catch block here out of principle, but the read
	   method doesn't seem to throw an exception no matter what kind
	   of file you throw at it - even PDF or PNG. So it's important
	   to validate after the read to make sure you're getting something
	   reasonable. */
	try {
            var workbook = sheetjs.read(e.target.result, { type: 'binary' });
	    logger.postMessage('TRACE', 'files', 'Successfully parsed Excel file');
	    this.callback(workbook);
	}
	catch (err) {
	    logger.postMessage('ERROR', 'files', err.message);
	    this.callback(null);
	}
	
	
    } // finishRead
    
    /**************************************************************************/

} // xlsxReader

export default xlsxReader;
