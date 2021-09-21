// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import config from '/js/config.js?v=0.21.2-beta';
import StudentSelectorDialog from '/js/dialogs/StudentSelectorDialog.js?v=0.21.2-beta';

function initialize () {

    StudentSelectorDialog.initialize();

} // initialize

config.registerModule('dialogs', initialize);