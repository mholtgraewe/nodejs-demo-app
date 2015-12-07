'use strict';

let config = require('../config/config');

// HTTPS redirect
module.exports = (function () {
    if (config.server.https.isEnabled) {
        return function (req, res, next) {
            if (!req.secure) {
                return res.redirect('https://' + req.headers.host + req.url);
            }
            next();
        };
    } else {
        return function (req, res, next) {
            next();
        };
    }
})();