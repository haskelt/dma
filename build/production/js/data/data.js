// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import config from '/dma/js/config.js?v=0.7.0-beta';
import DataManager from '/dma/js/data/DataManager.js?v=0.7.0-beta';

function initialize () {
    
    DataManager.configure(config.getConfig('data'));

} // initialize

/******************************************************************************/

config.registerModule('data', initialize);