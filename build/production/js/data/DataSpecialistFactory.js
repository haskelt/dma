// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '../logger/logger.js?v=0.22.1-beta';

class DataSpecialistFactory {

    static specialists = {};
    
    /*************************************************************************/

    static register (specialistType, specialist) {

	this.specialists[specialistType] = specialist;
	
    } // register
	
    /*************************************************************************/

    static build (specialistType) {

	return new this.specialists[specialistType]();
	
    } // build

    /*************************************************************************/

} // DataSpecialistFactory

export default DataSpecialistFactory;