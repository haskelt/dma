class Logger {

    static levels = {
        // this isn't a real message level, it's just for purposes of being
        // able to turn logging off entirely
        'OFF': {
            'severity': 10
        },
        'ERROR': {
            'severity': 5,
            'prefix': '! '
        },
        'WARN': {
            'severity': 4,
            'prefix': '! '
        },
        'INFO': {
            'severity': 3,
            'prefix': ''
        },
        'DEBUG': {
            'severity': 2,
            'prefix': '  %% '
        },
        'TRACE': {
            'severity': 1,
            'prefix': '    ++ '
        }
    };

    static logging_level = 'TRACE';

    static namespaces_to_post = ['tasks', 'fields'];

    /**************************************************************************/

    static postMessage (level, namespace, message) {
    // will post for the specified namespace and all child namespaces of it

	// first check if messages at this level should be logged
	if(Logger.levels[level]['severity'] >= Logger.levels[Logger.logging_level]['severity']){
	    // then check if messages for this namespace should be logged
	    for(let namespace_to_post of this.namespaces_to_post){
		if(namespace.startsWith(namespace_to_post)){
		    console.log(Logger.levels[level]['prefix'] + "<" + namespace + "> " + message);
		    break;
		}
	    }
	}
    
    } // postMessage
    
    /*************************************************************************/
}

export default Logger;
