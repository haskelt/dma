{{globals.js_copyright_notice}}

import logger from '{{globals.site_path}}/js/logger/logger.js?v={{globals.version}}';
import Roster from '{{globals.site_path}}/js/data/Roster.js?v={{globals.version}}';

class Consent {

    static consentField = '117284167';
    static possibleIdentifiers = {'name': 'Name', 'id': 'ID'};
    static dataSets = [];
    
    /**************************************************************************/

    static setData (tag, raw_data) {

	logger.postMessage('DEBUG', 'data', 'Setting consent and demographics data');

	/* Do a set of validation checks on the data */
	this.doSingleWorksheetCheck(raw_data);
	var data = raw_data[Object.keys(raw_data)[0]]
	this.doConsentFieldCheck(data);
	var identifiers = this.doIdentifierCheck(data);

    } // setData
    
    /**************************************************************************/


} // Consent

export default Consent;
