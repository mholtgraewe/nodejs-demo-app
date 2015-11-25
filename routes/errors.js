'use strict';

let logger = require('winston');

module.exports = function (app) {

    // 404
    app.use(function (req, res, next) {
        sendError({ status: 404, message: 'Not Found' }, req, res);
    });

    // 500
    app.use(function (err, req, res, next) {
        logger.error('Error at %s\n%s', req.url, err.stack);
        sendError({ status: 500, message: 'Internal Server Error' }, req, res);
    });

    function sendError(err, req, res) {
        res.status(err.status);

        if (req.accepts('html')) {
            return res.render('error', { error: err });
        }

        if (req.accepts('json')) {
            return res.json({ error: err.message });
        }

        // fallback response
        res.type('txt');
        res.send(err.message);
    }
};