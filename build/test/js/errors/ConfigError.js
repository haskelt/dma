/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

class ConfigError extends Error {
/* For when the configuration is invalid */ 
    
    /**************************************************************************/

    constructor(message) {

	super(message);
	this.name = "ConfigError";

    } // constructor

    /**************************************************************************/

}

export default ConfigError;