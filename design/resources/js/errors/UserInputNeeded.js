{{globals.js_copyright_notice}}

class UserInputNeeded extends Error {
/* For when we encountered an error condition but it can potentially be
   addressed with user input. */ 
    
    /**************************************************************************/

    constructor(message) {

	super(message);
	this.name = "UserInputNeeded";

    } // constructor

    /**************************************************************************/

}

export default UserInputNeeded;
