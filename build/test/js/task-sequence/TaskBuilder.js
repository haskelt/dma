
class TaskBuilder {

    static builders = {};
    
/*****************************************************************************/

    static registerBuilder (task_type, builder) {

	TaskBuilder.builders[task_type] = builder;
	
    } // registerBuilder

/*****************************************************************************/

    static getBuilder (task_type) {

	return TaskBuilder.builders[task_type];
	
    } // getBuilder

/*****************************************************************************/
    
}

export default TaskBuilder;