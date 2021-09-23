// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import config from '../config.js?v=0.22.1-beta';

function initialize () {
    
    console.log('in templates initializer');
    return Promise.resolve(true);
}

config.registerModule('templates', initialize);

