{{globals.js_copyright_notice}}

import CodeError from '../errors/CodeError.js?v={{globals.version}}';

class WarningTracker {

    static messages = new Map();
    static curId = null;
    
    /**************************************************************************/

    static resetMessages (id) {

	this.messages.set(id, []);
	
    } // startTracking
    
    /**************************************************************************/

    static startTracking (id) {

	this.curId = id;
	if(!this.messages.has(id)){
	    this.messages.set(id, []);
	}
	
    } // startTracking
    
    /**************************************************************************/

    static stopTracking () {

	this.curId = null;
	
    } // stopTracking
    
    /**************************************************************************/
    
    static postMessage (message) {

	if(!this.curId){
	    throw new CodeError('Warning message posted when tracking not active');
	}
	this.messages.get(this.curId).push(message);
	
    } // postMessage
    
    /*************************************************************************/

    static getAllMessages () {

	var messageArray = [];
	for(let [id, idMessages] of this.messages){
	    for(let message of idMessages){
		messageArray.push(message);
	    }
	}
	return messageArray;
	
    } // getAllMessages
    
    /*************************************************************************/

} // WarningTracker

export default WarningTracker;
