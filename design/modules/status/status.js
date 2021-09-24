{{globals.js_copyright_notice}}

import config from '../config.js?v={{globals.version}}';
import logger from '../logger/logger.js?v={{globals.version}}';
import message_dispatcher from '../logger/MessageDispatcher.js?v={{globals.version}}';

class StatusMessageHandler {

    /**************************************************************************/

    static initialize () {
	logger.postMessage('DEBUG', 'status', 'Initializing status module');
	this.statusMessagesElement = document.querySelector('#status-messages');
	message_dispatcher.subscribe('INFO', this.handleMessage.bind(this));
	return Promise.resolve(true);
	
    } // initialize

    /**************************************************************************/

    static handleMessage (level, namespace, message) {

	var messageNode = document.createElement('span');
	messageNode.innerText = message;
	messageNode.classList.add('message');
	messageNode.classList.add(level.toLowerCase());
	this.statusMessagesElement.appendChild(messageNode);
	
    } // handleMessage
    
    /**************************************************************************/
    
} // StatusMessageHandler

config.registerModule('status', StatusMessageHandler.initialize.bind(StatusMessageHandler));

