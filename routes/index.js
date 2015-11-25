'use strict';

let site = require('./site'),
    login = require('./login'),
    errors = require('./errors');

module.exports = function (app) {
    site(app);
    login(app);
    errors(app);
};