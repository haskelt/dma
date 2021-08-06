// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import logger from '/js/logger/logger.js?v=0.17.2-beta';

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