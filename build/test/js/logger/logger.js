/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import message_dispatcher from './MessageDispatcher.js?v=0.26.1-beta';
import ConsoleMessageHandler from './ConsoleMessageHandler.js?v=0.26.1-beta';
import ErrorLogReporter from './ErrorLogReporter.js?v=0.26.1-beta';

ConsoleMessageHandler.initialize();
ErrorLogReporter.initialize();

export default message_dispatcher;