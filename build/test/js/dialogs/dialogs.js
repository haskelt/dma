// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import config from '../config.js?v=0.22.1-beta';
import StudentSelectorDialog from './StudentSelectorDialog.js?v=0.22.1-beta';

function initialize () {

    StudentSelectorDialog.initialize();
    return Promise.resolve(true);

} // initialize

config.registerModule('dialogs', initialize);