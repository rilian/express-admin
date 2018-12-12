
exports.auth     = require('./auth' );
exports.login    = require('./login');
exports.notfound = require('./404');

exports.mainview = require('./mainview');
exports.listview = require('./listview');
exports.editview = require('./editview');

exports.render   = require('./render');

// STEFAN: add filter middle ware to correct filter data on the req body.
exports.filter = require('./filter');
