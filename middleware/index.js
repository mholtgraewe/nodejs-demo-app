'use strict';

let config = require('../config'),
    path = require('path'),
    express = require('express'),
    morgan = require('morgan'),
    fileStreamRotator = require('file-stream-rotator'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    session = require('express-session'),
    bcrypt = require('bcryptjs'),
    xssFilters = require('xss-filters'),
    csrf = require('csurf');

module.exports = function (app) {

    // setup Apache-like access logger
    let accessLogStream = fileStreamRotator.getStream(config.logger.access);
    app.use(morgan('combined', { stream: accessLogStream }));

    // set path to the public directory (styles, scripts, images etc.)
    app.use(express.static(config.publicPath));

    // enable POST param parsing
    app.use(bodyParser.urlencoded({ extended: false }));

    // validator for request params
    app.use(expressValidator({
        customSanitizers: {
            toLowerCase: function (value) {
                return (typeof value === 'string') ? value.toLowerCase() : value;
            },
            xss: function (value) {
                return xssFilters.inHTMLData(value);
            }
        }
    }));

    // enable session management
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: 'QruRCickR6sB',
        cookie: {
            httpOnly: true,
            secure: true
        }
    }));

    // enable Cross-Site-Request-Forgery protection
    app.use(csrf());

    // expose config and session to views
    app.use(function (req, res, next) {
        res.locals.config = config;
        res.locals.session = req.session;
        next();
    });

};