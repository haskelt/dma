{{project.js_copyright_notice}}

class DataWarning extends Error {
/* For issues with the data that the user should be aware of, but which
   aren't fatal errors that bring processing to a halt */
    
    /**************************************************************************/

    constructor(message) {

	super(message);
	this.name = "DataWarning";

    } // constructor

    /**************************************************************************/

}

export default DataWarning;
