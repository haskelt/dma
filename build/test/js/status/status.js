/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import config from '../config.js?v=0.24.0-beta';
import logger from '../logger/logger.js?v=0.24.0-beta';
import message_dispatcher from '../logger/MessageDispatcher.js?v=0.24.0-beta';

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
