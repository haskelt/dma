{{globals.js_copyright_notice}}

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
