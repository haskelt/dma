{{globals.js_copyright_notice}}

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
