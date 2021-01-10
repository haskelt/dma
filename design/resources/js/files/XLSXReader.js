{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{ SITE_PATH }}/js/logger.js';

class XLSXReader {

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
		alert('This app does not work on Internet Explorer');
            }
        } else {
            alert('This app does not work on browsers without HTML5 support.');
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
            var workbook = XLSX.read(e.target.result, { type: 'binary' });
	    logger.postMessage('TRACE', 'files', 'Successfully parsed Excel file');
	    /* we return a JSON object with an entry for each sheet, which
	       consists of an array of objects (1 object for each row) */
	    var results = {};
	    for(let sheet in workbook.Sheets){
		results[sheet] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
	    }
	    this.callback(results);
	}
	catch (err) {
	    logger.postMessage('ERROR', 'files', err.message);
	    this.callback(null);
	}
	
	
    } // finishRead
    
    /**************************************************************************/

} // XLSXReader

export default XLSXReader;


