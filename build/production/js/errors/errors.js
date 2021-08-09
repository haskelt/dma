// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

class Errors {

    static resumePoint = null;
    
    /**************************************************************************/

    static setResumePoint (f) {

	this.resumePoint = f;

    } // setResumePoint

    /**************************************************************************/

    static resume () {

	if(this.resumePoint){
	    this.resumePoint();
	}
	
    } // resume

    /**************************************************************************/

} // Errors

export default Errors;