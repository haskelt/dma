/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

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