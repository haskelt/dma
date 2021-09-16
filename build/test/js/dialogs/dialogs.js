// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import config from '/js/config.js?v=0.18.1-beta';
import StudentSelectorDialog from '/js/dialogs/StudentSelectorDialog.js?v=0.18.1-beta';

function initialize () {

    StudentSelectorDialog.initialize();

} // initialize

config.registerModule('dialogs', initialize);