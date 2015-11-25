'use strict';

// HTTPS redirect
module.exports = function (req, res, next) {
    if (!req.secure) {
        return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
};