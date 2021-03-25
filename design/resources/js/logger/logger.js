{{project.js_copyright_notice}}

import message_dispatcher from '{{project.site_path}}/js/logger/MessageDispatcher.js?v={{project.version}}';
// this will register the console message handler
import '{{project.site_path}}/js/logger/ConsoleMessageHandler.js?v={{project.version}}';

export default message_dispatcher;
