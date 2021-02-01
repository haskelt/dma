{{ JS_COPYRIGHT_NOTICE }}

import message_dispatcher from '{{SITE_PATH}}/js/logger/MessageDispatcher.js?v={{VERSION}}';

class StatusMessageHandler {

    /**************************************************************************/

    static initialize () {

	this.statusMessagesElement = document.querySelector('#status-messages');
	message_dispatcher.subscribe('INFO', this.handleMessage.bind(this));
	
    } // initialize

    /**************************************************************************/

    static handleMessage (level, namespace, message) {

	var messageNode = document.createElement('span');
	messageNode.innerText = message;
	messageNode.classList.add('message');
	messageNode.classList.add(level.toLowerCase());
	this.statusMessagesElement.appendChild(messageNode);
	messageNode.scrollIntoView(false);
	
    } // handleMessage
    
    /**************************************************************************/
    
} // StatusMessageHandler

StatusMessageHandler.initialize();

