// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/dma/js/logger/logger.js?v=0.11.0-beta';
import Roster from '/dma/js/data/Roster.js?v=0.11.0-beta';

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