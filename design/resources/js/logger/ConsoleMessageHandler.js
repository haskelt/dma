{{globals.js_copyright_notice}}

import message_dispatcher from './MessageDispatcher.js?v={{globals.version}}';

class ConsoleMessageHandler {

    static prefix = {
        'ERROR': '! ',
        'WARN': '? ',
        'INFO': '',
        'DEBUG': '  %% ',
        'TRACE': '    ++ '
    };

    static loggingLevel = 'DEBUG';

    static namespacesToPost = ['config', 'errors', 'tasks', 'fields', 'data', 'files', 'dialogs', 'xlsx'];

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


