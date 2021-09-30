/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import utilities from '../utilities.js?v=0.23.0-beta';
import logger from '../logger/logger.js?v=0.23.0-beta';
import TemplateManager from '../templates/TemplateManager.js?v=0.23.0-beta';
import Dialog from './Dialog.js?v=0.23.0-beta';

class StudentSelectorDialog extends Dialog {

    /**************************************************************************/

    static initialize () {

	/* if there is more than one student selector in the document,
	   only the first one will be initialized */
	this.element = document.querySelector('#student-selector');
	if(this.element){
	    this.header = this.element.querySelector('.dialogs__header');
	    this.header.appendChild(TemplateManager.expand('student-selector-prompt', {}));
	    this.targetIdentifierElement = this.header.querySelector('#student-selector__target-identifier');
	    this.targetStudentElement = this.header.querySelector('#student-selector__target-student');
	    this.studentListElement = this.element.querySelector('#student-selector__student-list');
	    this.element.querySelector('.dialogs__ok-button').addEventListener('click', this.handleOK.bind(this));
	    this.element.querySelector('.dialogs__cancel-button').addEventListener('click', this.handleCancel.bind(this));
	}
	
    } // constructor

    /**************************************************************************/

    static createOption (optionValue, optionText, checked = false) {

	var optionElement = TemplateManager.expand('student-option', { id: 'student-selector', optionValue: optionValue, optionText: optionText });
	/* this assumes there is an input element defined by the template,
	   which is reasonable since the point is to create a selectable
	   option */
	var inputElement = optionElement.querySelector('input');
	if(checked){
	    inputElement.checked = true;
	}
	this.options.push(inputElement);
	this.studentListElement.appendChild(optionElement);
	
    } // createOption
    
    /**************************************************************************/

    static getUserSelection (targetIdentifier, targetStudent, studentList, onResponse) {

	logger.postMessage('DEBUG', 'dialogs', 'Prompting user to select student with ' + targetIdentifier + ' "' + targetStudent + '"');
	this.targetIdentifierElement.textContent = targetIdentifier;
	this.targetStudentElement.textContent = targetStudent;
	this.options = [];
	/* we make this option checked by default */ 
	this.createOption('not-in-class', 'This student is not in my class', true);
	for(let student of studentList){
	    this.createOption(student, student);	    
	}
	this.onResponse = onResponse;
	super.show();
	
    } // getUserSelection

    /**************************************************************************/

    static handleOK () {
	var response;
	
	super.hide();
	for(let option of this.options){
	    if(option.checked){
		response = option.value;
		break;
	    }
	}
	while(this.studentListElement.firstChild){
	    this.studentListElement.removeChild(this.studentListElement.firstChild);
	}
	logger.postMessage('DEBUG', 'dialogs', 'Option "' + response + '" chosen in student selector');
	if(response == 'not-in-class'){
	    logger.postMessage('DEBUG', 'dialogs', 'Noting that student with ' + this.targetIdentifierElement.textContent + ' "' + this.targetStudentElement.textContent + '" is not in the class, will ignore any data for them');
	}
	this.onResponse(this.targetIdentifierElement.textContent, this.targetStudentElement.textContent, response);
	
    } // handleOK
    
    /**************************************************************************/

    static handleCancel () {
	
	super.hide();
	while(this.studentListElement.firstChild){
	    this.studentListElement.removeChild(this.studentListElement.firstChild);
	}
	logger.postMessage('DEBUG', 'dialogs', 'Student selector cancelled');
	
    } // handleCancel
    
    /**************************************************************************/
    
} // StudentSelectorDialog

export default StudentSelectorDialog;
