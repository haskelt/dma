{{ JS_COPYRIGHT_NOTICE }}

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
