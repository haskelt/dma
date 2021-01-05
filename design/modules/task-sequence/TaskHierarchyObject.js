class TaskHierarchyObject {

/*****************************************************************************/

    constructor () {

	this.parent = null;
	this.children = [];
	
    } // constructor

/******************************************************************************/

    setParent (parent) {

	this.parent = parent;

    } // setParent
    
/******************************************************************************/

    addChild (child) {

	this.children.push({ 'object': child, 'status': null });

    } // addChild

/******************************************************************************/

    setChildStatus (child, status) {

	var childIndex = this.children.findIndex(entry => entry['object'] == child);
	this.children[childIndex]['status'] = status;
	
    } // setChildStatus
    
/******************************************************************************/
    
} // TaskHierarchyObject

export default TaskHierarchyObject;
