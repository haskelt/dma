{{globals.js_copyright_notice}}

import config from '../config.js?v={{globals.version}}';

function initialize () {
    
    console.log('in templates initializer');
    return Promise.resolve(true);
}

config.registerModule('templates', initialize);


