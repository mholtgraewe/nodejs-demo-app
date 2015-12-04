'use strict';

let config = require('./config'),
    path = require('path'),
    http = require('http'),
    https = require('https'),
    fs = require('fs'),
    logger = require('winston'),
    express = require('express'),
    mongoose = require('mongoose'),
    models = require('./models'),
    middleware = require('./middleware'),
    routes = require('./routes');

// always log runtime exceptions to file
logger.handleExceptions(new logger.transports.File(config.logger.exceptions));

// disable logging to console by default
logger.remove(logger.transports.Console);

// enable logging to console only if NOT in test mode
// to avoid polluting of test reports with log messages
if (process.env.NODE_ENV !== 'test') {
    logger.add(logger.transports.Console, config.logger.console);
}

// enable logging to file
logger.add(logger.transports.File, config.logger.file);

mongoose.connect(config.db.uri, function (err) {
    if (err) throw err;

    logger.info('Connected to database at %s', config.db.uri);

    let app = express();

    // expose app to test scripts
    module.exports = app;

    // expose application wide properties (name, version etc.) to views
    app.locals.app = {
        name: config.app.name
    };

    // view engine setup
    app.set('views', config.views.path);
    app.set('view engine', config.views.engine);

    middleware(app);
    routes(app);

    // only start server if script is executed as standalone
    if (!module.parent) {
        http.createServer(app)
            .listen(config.server.http.port, function (err) {
                if (err) throw err;
                logger.info('HTTP server now listening on port %d', config.server.http.port);
            });

        https.createServer({
            key: fs.readFileSync(config.server.https.key),
            cert: fs.readFileSync(config.server.https.cert)
        }, app).listen(config.server.https.port, function (err) {
            if (err) throw err;
            logger.info('HTTPS server now listening on port %d', config.server.https.port);
        });
    }
});