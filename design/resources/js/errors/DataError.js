{{globals.js_copyright_notice}}

class DataError extends Error {
/* For when invalid data is provided by the user */ 
    
    /**************************************************************************/

    constructor(message) {

	super(message);
	this.name = "DataError";

    } // constructor

    /**************************************************************************/

}

export default DataError;
