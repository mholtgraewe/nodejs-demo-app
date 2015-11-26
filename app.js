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

// log runtime exceptions to a file
logger.handleExceptions(new logger.transports.File(config.logger.exceptions));

// log all other messages to the console and to a separate file
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, config.logger.console);
logger.add(logger.transports.File, config.logger.file);

mongoose.connect(config.db.uri, function (err) {
    if (err) throw err;

    logger.info('Connected to database at %s', config.db.uri);

    let app = express();

    // view engine setup
    app.set('views', config.views.path);
    app.set('view engine', config.views.engine);

    middleware(app);
    routes(app);

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
});