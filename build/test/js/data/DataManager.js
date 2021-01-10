// Copyright 2020 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger.js';
import Roster from '/js/data/Roster.js';
import StudentData from '/js/data/StudentData.js';

class DataManager {

    static setters = { 'roster': Roster.setData.bind(Roster), 'mct_pre': StudentData.setData.bind(StudentData) };
    static data = {};
    
    /**************************************************************************/

    static postData (tag, data) {

	logger.postMessage('DEBUG', 'data', 'Posting data for tag ' + tag + ' of ' + data);
	if(tag in this.setters){
	    this.setters[tag](tag, data);
	} else {
	    this.data[tag] = data;
	}
	
    } // postData
    
    /**************************************************************************/

    static validateData () {

	console.log(Roster.getAnonID('ID', '4215366'));
	
    } // validateData
    
    /**************************************************************************/
    
}

export default DataManager;