// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import config from '/js/config.js?v=0.21.1-beta';
import message_dispatcher from '/js/logger/MessageDispatcher.js?v=0.21.1-beta';

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
	
    } // handleMessage
    
    /**************************************************************************/
    
} // StatusMessageHandler

config.registerModule('status', StatusMessageHandler.initialize.bind(StatusMessageHandler));
