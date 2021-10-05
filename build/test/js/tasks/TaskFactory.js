/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import logger from '../logger/logger.js?v=0.24.1-beta';

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