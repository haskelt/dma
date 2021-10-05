{{globals.js_copyright_notice}}

import logger from '../logger/logger.js?v={{globals.version}}';

class TaskFactory {

    static builders = {};
    
    /**************************************************************************/

    static registerBuilder (taskType, builder) {

	logger.postMessage('TRACE', 'tasks', 'Registering task builder of type ' + taskType);
	TaskFactory.builders[taskType] = builder;
	
    } // registerBuilder

    /**************************************************************************/

    static build (taskType, element, parent) {

	logger.postMessage('DEBUG', 'tasks', 'Building task of type ' + taskType);
	return new TaskFactory.builders[taskType](element, parent);
	
    } // build

    /**************************************************************************/
    
}

export default TaskFactory;
