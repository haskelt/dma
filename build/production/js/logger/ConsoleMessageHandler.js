// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import message_dispatcher from '/dma/js/logger/MessageDispatcher.js?v=0.16.0-beta';

class ConsoleMessageHandler {

    static prefix = {
        'ERROR': '! ',
        'WARN': '? ',
        'INFO': '',
        'DEBUG': '  %% ',
        'TRACE': '    ++ '
    };

    static loggingLevel = 'DEBUG';

    static namespacesToPost = ['config', 'tasks', 'fields', 'data', 'files', 'xlsx'];

    /**************************************************************************/

    static initialize () {

	message_dispatcher.subscribe(this.loggingLevel, this.handleMessage.bind(this));
	
    } // initialize
    
    /**************************************************************************/
    
    static handleMessage (level, namespace, message) {
    // will post for the specified namespace and all child namespaces of it

	// then check if messages for this namespace should be logged
	for(let namespaceToPost of this.namespacesToPost){
	    if(namespace.startsWith(namespaceToPost)){
		console.log(this.prefix[level] + '<' + namespace + '> ' + message);
		break;
	    }
	}
    
    } // handleMessage
    
    /*************************************************************************/

}

ConsoleMessageHandler.initialize();

