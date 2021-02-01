{{ JS_COPYRIGHT_NOTICE }}

class MessageDispatcher {

    static severity = {
        // OFF isn't a real message level, it's just for purposes of being
        // able to turn logging off entirely
        'OFF': 10,
        'ERROR': 5,
        'WARN': 4,
        'INFO': 3,
        'DEBUG': 2,
        'TRACE': 1
    };
    
    static messageHandlers = [];
    
    /**************************************************************************/

    static subscribe (minLevel, handler) {

	this.messageHandlers.push({'minLevel': minLevel, 'handler': handler});
	
    } // subscribe
    
    /**************************************************************************/
    
    static postMessage (level, namespace, message) {

	for(let messageHandler of this.messageHandlers){
	    /* first check if messages at this level should be passed to
	       the handler */
	    if(this.severity[level] >= this.severity[messageHandler.minLevel]){
		messageHandler.handler(level, namespace, message);
	    }
	}
	
    } // postMessage
    
    /*************************************************************************/
}

export default MessageDispatcher;
