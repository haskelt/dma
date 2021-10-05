/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import message_dispatcher from '../logger/MessageDispatcher.js?v=0.26.0-beta';
import Dialog from './Dialog.js?v=0.26.0-beta';

class ErrorLogDialog extends Dialog {

    static prefix = {
        'ERROR': '! ',
        'WARN': '? ',
        'INFO': '',
        'DEBUG': '\xa0\xa0%% ',
        'TRACE': '\xa0\xa0\xa0\xa0++ '
    };
    
    /**************************************************************************/

    static initialize () {

	/* if there is more than one error log in the document,
	   only the first one will be initialized */
	this.element = document.querySelector('#error-log');
	if(this.element){
	    this.messageElement = this.element.querySelector('#error-log__messages');
	    this.element.querySelector('.dialogs__ok-button').addEventListener('click', this.handleOK.bind(this));
	    message_dispatcher.subscribe('TRACE', this.handleMessage.bind(this));
	    window.addEventListener('error', this.handleError.bind(this));
	}
	
    } // initialize

    /**************************************************************************/

    static handleMessage (level, namespace, message) {

	var messageNode = document.createElement('span');
	messageNode.innerText = `${this.prefix[level]}<${namespace}> ${message}`;
	messageNode.classList.add(level.toLowerCase());
	this.messageElement.appendChild(messageNode);

    } // handleMessage
    
    /**************************************************************************/

    static handleError (error) {

	this.handleMessage('ERROR', 'window', error.message);
	super.show();
	
    } // handleError
    
    /**************************************************************************/
    
    static handleOK () {

	super.hide();
	
    } // handleOK
    
    /**************************************************************************/

} // ErrorLogDialog

ErrorLogDialog.initialize();
export default ErrorLogDialog;
