{{globals.js_copyright_notice}}

import logger from '../logger/logger.js?v={{globals.version}}';
import warning_tracker from '../logger/WarningTracker.js?v={{globals.version}}';
import Task from '../tasks/Task.js?v={{globals.version}}';

class WarningBoxTask extends Task {

    /**************************************************************************/

    constructor (element) {

	super(element);
	this.messageListElement = element.querySelector('.fields__warning-box--message-list');
	
    } // constructor
    
    /**************************************************************************/

    setup () {

	this.messageListElement.innerText = '';
	var messages = warning_tracker.getAllMessages();
	if(messages.length > 0){
	    logger.postMessage('TRACE', 'fields', 'Displaying warning messages');
	    this.element.classList.remove('hidden');
	    messages.forEach((message) => {
		let messageNode = document.createElement('span');
		messageNode.innerText = message;
		this.messageListElement.appendChild(messageNode);
	    });
	} else {
	    logger.postMessage('TRACE', 'fields', 'No warning messages to display, hiding warning box');
	    this.element.classList.add('hidden');
	}
	
    } // setup

    /**************************************************************************/
    
} // WarningBoxTask

export default WarningBoxTask;
