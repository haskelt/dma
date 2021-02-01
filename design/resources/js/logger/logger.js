{{ JS_COPYRIGHT_NOTICE }}

import message_dispatcher from '{{SITE_PATH}}/js/logger/MessageDispatcher.js?v={{VERSION}}';
// this will register the console message handler
import '{{SITE_PATH}}/js/logger/ConsoleMessageHandler.js?v={{VERSION}}';

export default message_dispatcher;
