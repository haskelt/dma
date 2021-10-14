{{globals.js_copyright_notice}}

import message_dispatcher from './MessageDispatcher.js?v={{globals.version}}';
import ConsoleMessageHandler from './ConsoleMessageHandler.js?v={{globals.version}}';
import ErrorLogReporter from './ErrorLogReporter.js?v={{globals.version}}';

ConsoleMessageHandler.initialize();
ErrorLogReporter.initialize();

export default message_dispatcher;
