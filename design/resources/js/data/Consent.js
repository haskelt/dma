{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{SITE_PATH}}/js/logger.js?v={{VERSION}}';
import Roster from '{{SITE_PATH}}/js/data/Roster.js?v={{VERSION}}';

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
