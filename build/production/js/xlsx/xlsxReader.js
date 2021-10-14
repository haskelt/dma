/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import sheetjs from '../sheetjs/xlsx.full.min.js?v=0.26.1-beta';
import logger from '../logger/logger.js?v=0.26.1-beta';

class xlsxReader {

    /**************************************************************************/

    read (fileObject, callback) {

	this.callback = callback;
        var reader = new FileReader();
        reader.onload = this.finishRead.bind(this);                     
        reader.readAsBinaryString(fileObject);
	
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