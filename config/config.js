'use strict';

let path = require('path'),
    extend = require('extend'),
    defaults = require('./defaults'),
    environment = process.env.NODE_ENV || 'development',
    configPath = path.join('env', environment),
    config = require('./' + configPath);

module.exports = extend(true, defaults, config);