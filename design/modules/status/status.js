{{project.js_copyright_notice}}

import config from '{{project.site_path}}/js/config.js?v={{project.version}}';
import message_dispatcher from '{{project.site_path}}/js/logger/MessageDispatcher.js?v={{project.version}}';

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

config.registerModule('status', StatusMessageHandler.initialize.bind(StatusMessageHandler));

