// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

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