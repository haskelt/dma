// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import config from '../config.js?v=0.21.3-beta';
import DataManager from './DataManager.js?v=0.21.3-beta';

function initialize () {
    
    DataManager.initialize();

} // initialize

/******************************************************************************/

config.registerModule('data', initialize);