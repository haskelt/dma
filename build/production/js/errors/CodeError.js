/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

class CodeError extends Error {
/* For when a bug in the code is detected */ 
    
    /**************************************************************************/

    constructor(message) {

	super(message);
	this.name = "CodeError";

    } // constructor

    /**************************************************************************/

}

export default CodeError;