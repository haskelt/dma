/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import ConfigError from './errors/ConfigError.js?v=0.26.0-beta';

class Utilities {

    /**************************************************************************/
    /* Adapted from 
       https://javascript.plainenglish.io/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089 */
    
    static deepCopy (original) {

	if (typeof original !== 'object' || original === null) {
	    /** if <original> is not an object, just return it **/
	    return original;
	} else {
	    /** if <original> is an object, recursively copy all the
	       key/value pairs **/
	    /* arrays are considered of type object, but arrays and objects
	       need to be initialized differently */
	    let copy = Array.isArray(original) ? [] : {}
	    for(let key in original){
		// Recursively (deep) copy for nested objects, including arrays
		copy[key] = this.deepCopy(original[key])
	    }   
	    return copy
	}
	
    } // deepCopy

    /**************************************************************************/
    
    static fetchJSON (filename) {

	return fetch(filename)
            .then(function(response) {
		if(response.ok){
                    return response.json();
		} else {
		    throw new ConfigError(`Failed to load ${filename}`);
		}
            });

    } // fetchJSON

    /**************************************************************************/
    
    static fetchText(filename) {

	return fetch(filename)
            .then(function(response) {
		if(response.ok){
                    return response.text();
		} else {
		    throw new ConfigError(`Failed to load ${filename}`);
		}
            });

    } // fetchText

    /**************************************************************************/

} // Utilities

export default Utilities;