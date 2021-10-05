/* Copyright 2021 Todd R. Haskell\nDistributed under the terms of the Gnu GPL 3.0 */

import config from '../config.js?v=0.25.0-beta';
import logger from '../logger/logger.js?v=0.25.0-beta';
import DataManager from './DataManager.js?v=0.25.0-beta';

function initialize () {

    logger.postMessage('DEBUG', 'data', 'Initializing data module');
    DataManager.initialize();
    return Promise.resolve(true);

} // initialize

/******************************************************************************/

config.registerModule('data', initialize);