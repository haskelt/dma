/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import message_dispatcher from './MessageDispatcher.js?v=0.26.1-beta';

class ConsoleMessageHandler {

    static prefix = {
        'ERROR': '! ',
        'WARN': '? ',
        'INFO': '',
        'DEBUG': '  %% ',
        'TRACE': '    ++ '
    };

    static loggingLevel = 'TRACE';

    static namespacesToPost = ['config', 'errors', 'templates', 'tasks', 'fields', 'data', 'files', 'dialogs', 'xlsx'];

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

export default ConsoleMessageHandler;

