{{ JS_COPYRIGHT_NOTICE }}

import logger from '{{SITE_PATH}}/js/logger.js?v={{VERSION}}';

class TaskFactory {

    static builders = {};
    
    /**************************************************************************/

    static registerBuilder (taskType, builder) {

	logger.postMessage('TRACE', 'tasks', 'Registering task builder of type ' + taskType);
	TaskFactory.builders[taskType] = builder;
	
    } // registerBuilder

    /**************************************************************************/

    static build (taskType, element) {

	logger.postMessage('DEBUG', 'tasks', 'Building task of type ' + taskType);
	return new TaskFactory.builders[taskType](element);
	
    } // build

    /**************************************************************************/
    
}

export default TaskFactory;
