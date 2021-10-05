{{globals.js_copyright_notice}}

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
