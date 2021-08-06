// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import utilities from '/js/utilities.js?v=0.17.2-beta';
import logger from '/js/logger/logger.js?v=0.17.2-beta';
import Dialog from '/js/dialogs/Dialog.js?v=0.17.2-beta';

class StudentSelectorDialog extends Dialog {

    static promptTemplate = 'Unable to find the student with <span id="student-selector__target-identifier"> </span> "<span id="student-selector__target-student"> </span>" in the roster. If they are truly not in your class, you can just click OK. Otherwise, please indicate below which student this is. If they are not in the list but you would like to add them to the roster, you can edit your roster file to add them and then reload the app in your browser.';
    static optionTemplate = '<div class="dialogs__radio-option"><input type="radio" name="{=id=}" value="{=option=}"><label for="{=option=}">{=option=}</label></div>';
    
    /**************************************************************************/

    static initialize () {

	this.element = document.querySelector('#student-selector');
	this.prompt = this.element.querySelector('#student-selector__prompt');
	this.prompt.innerHTML = this.promptTemplate;
	this.targetIdentifierElement = this.element.querySelector('#student-selector__target-identifier');
	this.targetStudentElement = this.element.querySelector('#student-selector__target-student');
	this.studentListElement = this.element.querySelector('#student-selector__student-list');
	this.showButton = document.querySelector('.dialogs__show-button');
	this.showButton.addEventListener('click', this.testDialog.bind(this));
	this.okButton = this.element.querySelector('.dialogs__ok-button');
	this.okButton.addEventListener('click', this.processResponse.bind(this));
	
    } // constructor

    /**************************************************************************/

    static createOption (optionText, checked = false) {

	var optionElement = utilities.expandHTMLTemplate(this.optionTemplate, { id: 'student-selector', option: optionText });
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

    static getUserSelection (targetIdentifier, targetStudent, studentList) {

	this.targetIdentifierElement.textContent = targetIdentifier;
	this.targetStudentElement.textContent = targetStudent;
	this.options = [];
	/* we make this option checked by default */ 
	this.createOption('This student is not in my class', true);
	for(let student of studentList){
	    this.createOption(student);	    
	}
	super.show();
/*	return new Promise((resolve, reject)  => {
	    this.promiseResolver = resolve;
	});
*/
	return null;
    } // getUserSelection

    /**************************************************************************/

    static processResponse () {
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
	logger.postMessage('INFO', 'dialogs', 'Option "' + response + '" chosen in student selector');
	//this.promiseResolver(response);
	
    } // processResponse
    
    /**************************************************************************/
    
    static testDialog () {
	
	var targetIdentifier = 'Name';
	var targetStudent = 'Nate';
	var studentList = ['Frank', 'Grace', 'Nathan'];
	this.getUserSelection(targetIdentifier, targetStudent, studentList);
//	    .then(function (response) { console.log(response); });
	
    } // testDialog
    
    /**************************************************************************/
    
} // StudentSelectorDialog

export default StudentSelectorDialog;
