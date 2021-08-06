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
	    console.log('resuming after after');
	    this.resumePoint();
	}
	
    } // resume

    /**************************************************************************/

} // Errors

export default Errors;
