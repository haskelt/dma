{{ JS_COPYRIGHT_NOTICE }}

import message_dispatcher from '{{SITE_PATH}}/js/logger/MessageDispatcher.js?v={{VERSION}}';

class ConsoleMessageHandler {

    static prefix = {
        'ERROR': '! ',
        'WARN': '? ',
        'INFO': '',
        'DEBUG': '  %% ',
        'TRACE': '    ++ '
    };

    static loggingLevel = 'DEBUG';

    static namespacesToPost = ['tasks', 'fields', 'data', 'files', 'xlsx'];

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


